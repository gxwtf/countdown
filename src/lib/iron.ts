import { SessionOptions } from 'iron-session'

export interface SessionData {
  isLoggedIn: boolean
  userId: number
  username: string
  admin: boolean
  realName?: string
  email?: string
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  userId: 0,
  username: '',
  admin: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'countdown_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
}
