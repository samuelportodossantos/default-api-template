// import jwt from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { _ResponseType } from '../Types/ResponseType'
import UserService from './UserService'
dotenv.config()

export default class AuthService {

    private secret: string

    constructor(){
        this.secret = `${process.env.JWT_SECRET}`
    }

    public generateJWT() {
        return jwt.sign({date: '17/12/1991'}, this.secret, {
            expiresIn: '1h'
        })
    }

    public validateJWT(token: string): boolean {
        try {
            jwt.verify(token.split('Bearer ').join(''), this.secret)
            return true
        } catch {
            return false
        }
    }

    public validateEmail(email:string):boolean{
        const emailValidateRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailValidateRegex.test(email)
    }

    public validatePassword(password:string):boolean{
        const passwordValidateRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        return passwordValidateRegex.test(password)
    }

    public async login(email:string, password: string): Promise<_ResponseType>{
        let result : _ResponseType = {
            status: 'success',
            message: 'Dados de acesso validados com sucesso!',
            data: [],
            token:  this.generateJWT()
        }
        if (! this.validateEmail(email) || !this.validatePassword(password) ) {
            result.status = 'warning'
            result.message = 'Endereço de email ou senha inválidos'
            delete(result.token)
        }
        const users = new UserService()
        const user = await users.list({email, password})
        if (user.data.length <= 0) {
            result.status = 'warning'
            result.message = 'Usuário ou senha não existem'
            delete(result.token)
        }
        return result
    }

}