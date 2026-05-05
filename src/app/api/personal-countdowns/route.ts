import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'

async function getSession() {
  return await getIronSession<SessionData>(await cookies(), sessionOptions)
}

export async function GET() {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const countdowns = await prisma.personalCountdown.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      targetDate: 'asc',
    },
  })
  
  return NextResponse.json(countdowns)
}

export async function POST(request: Request) {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const body = await request.json()
  
  const countdown = await prisma.personalCountdown.create({
    data: {
      userId: session.userId,
      title: body.title,
      targetDate: new Date(body.targetDate),
      backgroundColor: body.backgroundColor,
      backgroundImage: body.backgroundImage,
    },
  })
  
  return NextResponse.json(countdown, { status: 201 })
}

export async function PUT(request: Request) {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const body = await request.json()
  
  const existing = await prisma.personalCountdown.findUnique({
    where: { id: body.id },
  })
  
  if (!existing || existing.userId !== session.userId) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }
  
  const countdown = await prisma.personalCountdown.update({
    where: { id: body.id },
    data: {
      title: body.title,
      targetDate: new Date(body.targetDate),
      backgroundColor: body.backgroundColor,
      backgroundImage: body.backgroundImage,
    },
  })
  
  return NextResponse.json(countdown)
}

export async function DELETE(request: Request) {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const existing = await prisma.personalCountdown.findUnique({
    where: { id: parseInt(id) },
  })
  
  if (!existing || existing.userId !== session.userId) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }
  
  await prisma.personalCountdown.delete({
    where: { id: parseInt(id) },
  })
  
  return NextResponse.json({ success: true })
}
