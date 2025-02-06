export type ApiError = {
  code: string
  message: string
  details?: Record<string, any>
}

export type ApiResponse<T> = {
  data?: T
  error?: ApiError
  status: 'success' | 'error' | 'loading'
}

export type ValidationError = {
  field: string
  message: string
}

export interface FormErrors {
  [key: string]: string | undefined
} 