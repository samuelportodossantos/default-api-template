import express from 'express'
import bodyparser from 'express'
import dotenv from 'dotenv'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import AuthRoutes from './Routes/AuthRoutes'
import UserRoutes from './Routes/UserRoutes'
dotenv.config()

export default class App {

    private port: string
    private server: any

    constructor(){
        this.port = `${process.env.API_PORT}`
        this.server = express()
        this.setConfig()
        this.setMiddlewares()
        this.setRoutes()
        this.startServert()
    }

    private setConfig() {
        this.server.use(bodyparser.urlencoded())
        this.server.use(bodyparser.json())
    }

    private setMiddlewares(){
        this.server.use(AuthMiddleware)
    }

    private setRoutes(){
        this.server.use('/auth', AuthRoutes)
        this.server.use('/users', UserRoutes)
    }

    private startServert(){
        this.server.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        });
    }

}