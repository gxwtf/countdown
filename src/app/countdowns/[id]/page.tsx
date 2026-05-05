import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'
import CountdownDetail from '@/components/CountdownDetail'

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sortOrder: string }>;
}

export default async function CountdownPage(props: Props) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  const params = await props.params

  const countdown = await prisma.countdown.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!countdown) {
    notFound()
  }

  return (
    <CountdownDetail
      id={countdown.id}
      title={countdown.title}
      targetDate={countdown.targetDate}
      backgroundColor={countdown.backgroundColor}
      backgroundImage={countdown.backgroundImage}
      isPersonal={false}
      canEdit={session.admin}
      editHref={`/countdowns/${countdown.id}/edit`}
      deleteApiEndpoint="/api/countdowns"
    />
  )
}
