import 'dotenv/config'
import { DataSourceOptions } from 'typeorm'
import { env } from './env.js'

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.DB_SYNCHRONIZE === 'true',
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/models/**/*.ts'],
  subscribers: [],
  migrations: []
}
