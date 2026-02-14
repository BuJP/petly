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
