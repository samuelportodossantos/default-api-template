import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import RequestResponse from "../Types/requestResponse";
import Auth from "../Entities/Auth";
dotenv.config()

export default async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const exceptions = ['/auth/login']
    if (exceptions.findIndex(route => route === request.url) > -1) {
        return next()
    }
    const error : RequestResponse = {
        status: "error",
        message: "Token not provided or invalid",
        data: []
    }
    const token = request.headers['authorization'] ?? false
    if (token) {
        const auth = new Auth()
        if ( await auth.validateJWT(token) ) {
            return next()
        }
        return response.json(error)
    }
    return response.json(error)
}