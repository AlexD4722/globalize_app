import {
    DATABASE_DIALECT,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_URL,
    DATABASE_USER,
} from '@/settings/be_config'
import { Options, Sequelize } from 'sequelize'

const config: Options = {
    database: DATABASE_NAME,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    host: DATABASE_URL,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}

const sequelize = new Sequelize(config)

export default sequelize
