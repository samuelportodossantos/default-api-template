export default interface RequestResponse {
    status: string
    message: string
    data: object[]
    token?: string
}