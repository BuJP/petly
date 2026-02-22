import User from '#models/user'

export class UserPresenter {
  static present(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt.toISO(),
    }
  }
}
