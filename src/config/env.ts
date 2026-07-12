import dotenv from 'dotenv'
import path from 'path'

// Xác định file cần load dựa trên NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'

dotenv.config({
  path: path.resolve(process.cwd(), envFile)
})

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('8080'),
  DB_HOST: z.string(),
  DB_PORT: z.string().default('5432'),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_SYNCHRONIZE: z.string().default('true')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  process.exit(1)
}

export const env = _env.data
