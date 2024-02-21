import crypto from 'crypto'
import session from 'express-session'

const secret = crypto.randomBytes(32).toString('hex')

export const cokiesSecret = () => session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Debe configurarse en true cuando se utiliza SameSite "None" en un sitio con HTTPS
    sameSite: 'none' // Configura SameSite en "None" para permitir cookies en contextos de terceros
  }
})
