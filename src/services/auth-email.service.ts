import { Resend } from 'resend'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resendMailService = new Resend(process.env.RESEND_API_KEY || '')

export const sendWelcomeEmail = async (email: string, name: string) => {
  const templatePath = path.resolve(__dirname, '../../emails/welcome.handlebars')
  const templateSource = fs.readFileSync(templatePath, 'utf-8')
  const template = Handlebars.compile(templateSource)
  const html = template({ name, email })

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@gapcm.com',
    subject: 'Welcome to Gapcm!',
    html
  }

  try {
    const { data, error } = await resendMailService.emails.send(msg)
    if (error) {
      throw new Error(`Error sending welcome email: ${error.message}`)
    }
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

export const sendVerificationEmail = async (email: string, name: string, token: string) => {

  const templatePath = path.resolve(__dirname, '../../ui/verify.handlebars')
  const templateSource = fs.readFileSync(templatePath, 'utf-8')
  const template = Handlebars.compile(templateSource)
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
  const html = template({ name, email, verifyUrl })

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || '',
    subject: 'Verify Your Email for Gapcm',
    html
  }

  try {
    const { data, error } = await resendMailService.emails.send(msg)
    if (error) {
      throw new Error(`Error sending verification email: ${error.message}`)
    }
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}
