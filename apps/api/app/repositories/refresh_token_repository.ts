import RefreshToken from '#models/refresh_token'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export class RefreshTokenRepository {
  public async create(
    payload: Pick<RefreshToken, 'userId' | 'token'>,
    options: {
      transaction?: TransactionClientContract
    } = {}
  ): Promise<RefreshToken> {
    const { transaction } = options

    return RefreshToken.create(
      {
        userId: payload.userId,
        token: payload.token,
        isRevoked: false,
      },
      {
        client: transaction,
      }
    )
  }

  public async revokeOldestTokenForUserIfNeeded(
    payload: {
      userId: RefreshToken['userId']
      maxActiveTokensPerUser: number
    },
    options: {
      transaction?: TransactionClientContract
    } = {}
  ): Promise<boolean> {
    const { userId, maxActiveTokensPerUser } = payload
    const { transaction } = options

    const client = transaction ?? db

    const result = await client.rawQuery(
      `
      -- CTE to calculate active token count and find the oldest active token for the user
      WITH token_stats AS (
        SELECT 
          -- Count all active tokens for the user
          COUNT(*) as active_count, 
          -- Subquery to get the ID of the oldest active token for this user
          (
            SELECT id 
            FROM refresh_tokens 
            WHERE user_id = :user_id 
              AND is_revoked = false
            ORDER BY created_at ASC 
            LIMIT 1
          ) as oldest_token_id
        FROM refresh_tokens
        WHERE user_id = :user_id
          AND is_revoked = false
      )
      -- Update the oldest token if the user has reached or exceeded the max allowed active tokens
      UPDATE refresh_tokens
      SET 
        is_revoked = true,
        revoked_at = NOW()
      FROM token_stats
      WHERE refresh_tokens.id = token_stats.oldest_token_id
        AND token_stats.active_count >= :max_active_tokens_per_user
      RETURNING refresh_tokens.id
    `,
      {
        user_id: userId,
        max_active_tokens_per_user: maxActiveTokensPerUser,
      }
    )

    return result.rows.length > 0
  }
}
