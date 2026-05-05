import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import EditCountdownForm from '@/components/EditCountdownForm'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sortOrder: string }>;
}

export default async function EditCountdownPage(props: Props) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  const params = await props.params

  if (!session.admin) {
    redirect('/login?back=/countdowns')
  }

  const countdown = await prisma.countdown.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!countdown) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">编辑公共倒数日</h1>
      <EditCountdownForm
        countdown={{
          id: countdown.id,
          title: countdown.title,
          targetDate: formatDate(countdown.targetDate),
          backgroundColor: countdown.backgroundColor || undefined,
          backgroundImage: countdown.backgroundImage || undefined,
        }}
        isPersonal={false}
      />
    </div>
  )
}
