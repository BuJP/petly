import { ApiExceptionExceptionPayload } from '#exceptions/api_exception'

export const formatSuccessResponse = <T>(data: T) => ({
  data,
})

export const formatErrorResponse = ({ code, message, details }: ApiExceptionExceptionPayload) => ({
  error: {
    code,
    message,
    details: details ?? null,
  },
})
