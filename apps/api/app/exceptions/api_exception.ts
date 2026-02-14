import { Exception } from '@adonisjs/core/exceptions'

export type ApiExceptionExceptionPayload = {
  message: string
  code: string
  status: number
  details?: any
}

export class ApiException extends Exception {
  public details?: any
  declare status: number
  declare code: string

  constructor(payload: ApiExceptionExceptionPayload) {
    const { message, code, status = 500, details } = payload

    super(message, {
      status,
      code,
    })

    this.details = details
    this.status = status
    this.code = code
  }
}
