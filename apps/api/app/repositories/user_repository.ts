import User from '#models/user'
import { RegisterPayload } from '#validators/auth'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return User.query().where('email', email).first()
  }

  public async create(
    payload: RegisterPayload,
    options: {
      transaction?: TransactionClientContract
    } = {}
  ): Promise<User> {
    const { transaction } = options

    return User.create(
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        passwordHash: payload.password,
      },
      {
        client: transaction,
      }
    )
  }
}
