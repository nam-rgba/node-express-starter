import { DataSource } from "typeorm";
import "reflect-metadata"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: ['src/models/**/*.ts'],
    subscribers: [],
    migrations: [],
})