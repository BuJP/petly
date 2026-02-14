import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail().trim(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), // At least 1 lowercase letter, 1 uppercase letter, 1 number
    firstName: vine.string().trim().minLength(2).maxLength(50),
    lastName: vine.string().trim().minLength(2).maxLength(50),
  })
)

export type RegisterPayload = Infer<typeof registerValidator>
