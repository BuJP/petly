import { ApiException } from './api_exception.js'

export class EmailAlreadyExistsException extends ApiException {
  constructor() {
    super({
      message: 'An account with the given email already exists.',
      code: 'E_AUTH_EMAIL_EXISTS',
      status: 409,
    })
  }
}

export class InvalidCredentialsException extends ApiException {
  constructor() {
    super({
      message: 'The provided email or password is incorrect.',
      code: 'E_AUTH_INVALID_CREDENTIALS',
      status: 401,
    })
  }
}
