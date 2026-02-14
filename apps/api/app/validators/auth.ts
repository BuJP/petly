import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine
      .string()
      .minLength(PASSWORD_MIN_LENGTH)
      .maxLength(PASSWORD_MAX_LENGTH)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), // At least 1 lowercase letter, 1 uppercase letter, 1 number
    firstName: vine.string().trim().minLength(2).maxLength(50),
    lastName: vine.string().trim().minLength(2).maxLength(50),
  })
)

export type RegisterPayload = Infer<typeof registerValidator>

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(PASSWORD_MIN_LENGTH).maxLength(PASSWORD_MAX_LENGTH),
  })
)

export type LoginPayload = Infer<typeof loginValidator>
