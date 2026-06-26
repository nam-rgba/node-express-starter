import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './data-source.js'

const app = express()

import router from './routes/index.js'
import cors from 'cors'
import { config } from 'dotenv'

async function start() {
  config()

  await AppDataSource.initialize()
  console.log("Database connected")


  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.use('/api', router)

  const PORT = process.env.PORT || 8081

  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`)
  })

  // Error handling function
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    console.log('error', error)
    return res.status(statusCode).json({
      status: 'error',
      code: statusCode,
      message: `${statusCode}: ` + error.message || 'Internal Server Error'
    })
  })
}
