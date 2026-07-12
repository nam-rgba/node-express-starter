import { DataSource } from 'typeorm'
import { dbConfig } from '../config/db.config.js'

export const AppDataSource = new DataSource(dbConfig)

export const connectDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log('✅ Data Source has been initialized!')
  } catch (error) {
    console.error('❌ Error during Data Source initialization:', error)
    process.exit(1)
  }
}
