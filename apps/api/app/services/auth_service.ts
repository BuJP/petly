import User from '#models/user'
import { RefreshTokenRepository } from '#repositories/refresh_token_repository'
import { UserRepository } from '#repositories/user_repository'
import { RegisterPayload } from '#validators/auth'
import { AuthTokens, AuthTokenService } from './auth_token_service.js'
import env from '#start/env'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { EmailAlreadyExistsException } from '#exceptions/auth_exceptions'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authTokenService: AuthTokenService
  ) {}

  public async register(payload: RegisterPayload) {
    const { email } = payload

    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new EmailAlreadyExistsException()
    }

    const transaction = await db.transaction()

    try {
      const user = await this.userRepository.create(payload, { transaction })
      const tokens = await this.generateAndStoreTokens({ user, transaction })

      await transaction.commit()

      return { tokens, user }
    } catch (error) {
      await transaction.rollback()

      // Race condition safeguard
      if (error.constraint === 'users_email_unique') {
        throw new EmailAlreadyExistsException()
      }

      throw error
    }
  }

  /**
   * Generates and stores access + refresh tokens for a user.
   * Revokes the oldest token if the user exceeds the max active tokens limit.
   */
  private async generateAndStoreTokens(payload: {
    user: User
    transaction: TransactionClientContract
  }): Promise<AuthTokens> {
    const { user, transaction } = payload

    const tokens = await this.authTokenService.generateTokens({
      id: user.id,
      email: user.email,
    })

    const maxActiveTokensPerUser = env.get('MAX_ACTIVE_TOKENS_PER_USER', 5)

    await this.refreshTokenRepository.revokeOldestTokenForUserIfNeeded(
      {
        userId: user.id,
        maxActiveTokensPerUser,
      },
      {
        transaction,
      }
    )

    await this.refreshTokenRepository.create(
      {
        userId: user.id,
        token: tokens.refreshToken,
      },
      {
        transaction,
      }
    )

    return tokens
  }
}
