import { Request, Response, Router } from "express";
import Auth from "../Services/AuthService";
import { _ResponseType } from "../Types/ResponseType";
const AuthRoutes = Router()

AuthRoutes.get('/user', function(request: Request, response: Response){
    const resp : _ResponseType = {
        status: "success",
        message: "Retorna informações do usuário",
        data: []
    }
    return response.json(resp)
})

AuthRoutes.post('/login', async function(request: Request, response: Response){
    const auth = new Auth()
    const login = await auth.login(request.body.email, request.body.password)
    return response.json(login)
})

export default AuthRoutes