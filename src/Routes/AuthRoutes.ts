import { Request, Response, Router } from "express";
import Auth from "../Entities/Auth";
import RequestResponse from "../Types/requestResponse";
const AuthRoutes = Router()

AuthRoutes.get('/user', function(request: Request, response: Response){
    const resp : RequestResponse = {
        status: "success",
        message: "Retorna informações do usuário",
        data: []
    }
    return response.json(resp)
})

AuthRoutes.post('/login', function(request: Request, response: Response){
    const auth = new Auth()
    const login = auth.login(request.body.email, request.body.password)
    return response.json(login)
})

AuthRoutes.delete('/logout', function(request: Request, response: Response){
    const resp : RequestResponse = {
        status: "success",
        message: "Remove sessão do usuário",
        data: []
    }
    return response.json(resp)
})

export default AuthRoutes