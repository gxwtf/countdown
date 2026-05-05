import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'
import axios from 'axios'

export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  const url = new URL(request.url)
  const host = request.headers.get('host')
  const { token, back } = Object.fromEntries(url.searchParams.entries())

  if (!token) {
    return NextResponse.json({ error: '缺少验证码 Token' }, { status: 400 })
  }

  try {
    const res = await axios.post('https://account.gxwtf.cn/sso/verify', {
      token,
    })

    if (res.data.success) {
      session.isLoggedIn = true
      session.userId = res.data.userId
      session.username = res.data.userName
      session.admin = res.data.admin === 1
      session.realName = res.data.userRealName
      session.email = res.data.userEmail
      await session.save()

      return NextResponse.redirect(new URL(back || '/countdowns', 'http://' + host), 302)
    } else {
      return NextResponse.redirect(new URL('/login?back=' + back, 'http://' + host), 302)
    }
  } catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/login?back=' + back, 'http://' + host), 302)
  }
}
