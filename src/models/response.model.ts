export interface Response<T> {
    data?: T | T[]
    error?: string
    status: number
}