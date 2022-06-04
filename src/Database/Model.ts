import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

export default class Model {

    private db: string
    private port: number
    private username: string
    private password: string
    private host: string
    public instance: any

    constructor() {
        this.host = `${process.env.DB_HOST}`
        this.username = `${process.env.DB_USER}`
        this.password = `${process.env.DB_PWRD}`
        this.db = `${process.env.DB_DBSA}`
        this.port = parseInt(`${process.env.DB_PORT}`)
        this.setup()
    }

    private setup() {
        this.instance = new Sequelize(this.db, this.username, this.password, {
            host: this.host,
            dialect: 'mysql',
            port: this.port
        })
    }

}