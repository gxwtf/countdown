import { prisma } from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'
import CountdownDetail from '@/components/CountdownDetail'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PersonalCountdownDetailPage({ params }: PageProps) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  
  if (!session.isLoggedIn) {
    redirect('/login?back=/countdowns')
  }

  const { id } = await params
  const countdown = await prisma.personalCountdown.findUnique({
    where: { id: parseInt(id) },
  })

  if (!countdown || countdown.userId !== session.userId) {
    notFound()
  }

  return (
    <CountdownDetail
      id={countdown.id}
      title={countdown.title}
      targetDate={countdown.targetDate}
      backgroundColor={countdown.backgroundColor}
      backgroundImage={countdown.backgroundImage}
      isPersonal={true}
      canEdit={true}
      editHref={`/personal/${countdown.id}/edit`}
      deleteApiEndpoint="/api/personal-countdowns"
    />
  )
}
