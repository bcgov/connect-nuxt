export interface ConnectApiError {
  category: ConnectErrorCategory
  detail?: string | string[]
  message: string
  statusCode: number
}
