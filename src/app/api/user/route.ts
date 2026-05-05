import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData, defaultSession } from '@/lib/iron'

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 })
  }

  return NextResponse.json({
    isLoggedIn: true,
    userId: session.userId,
    username: session.username,
    admin: session.admin,
    realName: session.realName,
    email: session.email,
  })
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
  return NextResponse.json({ success: true })
}
