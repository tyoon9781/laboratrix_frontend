export const BACKEND_URL = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`

export enum Status {
    SUCCESS = "success",
    ERROR = "error"
}