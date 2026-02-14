import jwt from 'jsonwebtoken'
import env from '#start/env'
import User from '#models/user'

type AuthTokenPayload = {
  sub: string // user_id
  email: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export class AuthTokenService {
  public generateAccessToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, env.get('JWT_SECRET'), {
      expiresIn: env.get('JWT_ACCESS_TOKEN_EXPIRES_IN', '15m'),
    })
  }

  public generateRefreshToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, env.get('JWT_REFRESH_TOKEN_SECRET'), {
      expiresIn: env.get('JWT_REFRESH_TOKEN_EXPIRES_IN', '7d'),
    })
  }

  public generateTokens(user: Pick<User, 'id' | 'email'>): AuthTokens {
    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
    }

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }
}
