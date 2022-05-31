// import jwt from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import RequestResponse from '../Types/requestResponse'
dotenv.config()

export default class Auth {

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

    public login(email:string, password: string): RequestResponse{
        let result : RequestResponse = {
            status: 'success',
            message: 'Dados de acesso validados com sucesso!',
            data: [],
            token:  this.generateJWT()
        }
        if (! this.validateEmail(email) || !this.validatePassword(password) ) {
            result.status = 'error'
            result.message = 'Endereço de email ou senha inválidos'
            delete(result.token)
        }
        return result
    }

}