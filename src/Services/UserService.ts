import User from "../Database/UsersModel";
import { _ResponseType } from "../Types/ResponseType";
import { UserType } from "../Types/UserType";
import bcrypt from 'bcrypt'

export default class UserService {
    public async list(search:{}) : Promise<_ResponseType> {
        let response :_ResponseType = {
            status: "success",
            message: "Lista de usuários retornada com sucesso",
            data: []
        }
        try {
            response.data = await User.findAll({where: search})
            return response
        } catch (err : any) {
            response.message = err?.message
            response.status = 'error'
            return response
        }
    }

    public async create(params: UserType) : Promise<_ResponseType> {
        let response :_ResponseType = {
            status: "success",
            message: "Lista de usuários retornada com sucesso",
            data: []
        }
        if ( !params.email || !params.name || !params.password ) {
            response.message = "Parametros obrigatorios faltando"
            response.status = "warning"
            return response
        }
        const user = await User.findOne({where:{email: params.email}})
        if (user) {
            response.message = `O endereço de email ${params.email} não pode ser usado.`
            response.status = "warning"
            return response
        }
        try {
            await User.create({
                name: params.name,
                email: params.email,
                password: await bcrypt.hash(params.password, 10)
            })
            return response
        } catch (err : any) {          
            response.message = err?.message
            response.status = 'error'
            return response
        }
    }
}