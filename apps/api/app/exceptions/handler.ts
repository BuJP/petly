import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { Exception } from '@adonisjs/core/exceptions'
import { ApiException } from './api_exception.js'
import { formatErrorResponse } from '../utils/response.js'

const DEFAULT_ERROR_CODE = 'E_INTERNAL_ERROR'
const DEFAULT_ERROR_MESSAGE = 'An internal error occurred'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof ApiException) {
      return ctx.response.status(error.status).send(
        formatErrorResponse({
          code: error.code,
          message: error.message,
          details: error.details || null,
          status: error.status,
          stack: this.debug ? error.stack : undefined,
        })
      )
    }

    if (error instanceof errors.E_VALIDATION_ERROR) {
      return ctx.response.status(error.status).send(
        formatErrorResponse({
          code: error.code,
          message: error.message,
          details: error.messages,
          status: error.status,
          stack: this.debug ? error.stack : undefined,
        })
      )
    }

    if (error instanceof Exception) {
      return ctx.response.status(error.status).send(
        formatErrorResponse({
          code: error.code ?? DEFAULT_ERROR_CODE,
          message: error.message,
          details: null,
          status: error.status,
          stack: this.debug ? error.stack : undefined,
        })
      )
    }

    if (error instanceof Error) {
      return ctx.response.status(500).send(
        formatErrorResponse({
          code: DEFAULT_ERROR_CODE,
          message: this.debug ? error.message : DEFAULT_ERROR_MESSAGE,
          details: null,
          status: 500,
          stack: this.debug ? error.stack : undefined,
        })
      )
    }

    return ctx.response.status(500).send(
      formatErrorResponse({
        code: DEFAULT_ERROR_CODE,
        message: DEFAULT_ERROR_MESSAGE,
        details: null,
        status: 500,
      })
    )
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
