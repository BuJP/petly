import { AuthService } from '#services/auth_service'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserPresenter } from '../presenters/user_presenter.js'
import { formatSuccessResponse } from '#utils/response'

@inject()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async register(context: HttpContext) {
    const { request, response } = context

    const payload = await request.validateUsing(registerValidator)

    const { user, tokens } = await this.authService.register(payload)

    return response.created(
      formatSuccessResponse({
        user: UserPresenter.present(user),
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      })
    )
  }

  public async login(context: HttpContext) {
    const { request, response } = context

    const payload = await request.validateUsing(loginValidator)

    const { user, tokens } = await this.authService.login(payload)

    return response.ok(
      formatSuccessResponse({
        user: UserPresenter.present(user),
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      })
    )
  }
}
