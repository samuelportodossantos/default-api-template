import { Request, Response, Router } from "express"
import UserService from "../Services/UserService"
import { _ResponseType } from "../Types/ResponseType"
const UserRoutes = Router()

UserRoutes.get('/', async function (request: Request, response: Response) {
    const users = new UserService()
    const user = await users.list(request.query)
    return response.json({ ok: user })
})

UserRoutes.post('/', async function (request: Request, response: Response) {
    const users = new UserService()
    const user = await users.create(request.body)
    return response.json({ ok: user })
})

export default UserRoutes