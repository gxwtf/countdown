import { prisma } from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'
import EditCountdownForm from '@/components/EditCountdownForm'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditPersonalCountdownPage({ params }: PageProps) {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">编辑个人倒数日</h1>
      <EditCountdownForm
        countdown={{
          id: countdown.id,
          title: countdown.title,
          targetDate: countdown.targetDate.toISOString().split('T')[0],
          backgroundColor: countdown.backgroundColor || undefined,
          backgroundImage: countdown.backgroundImage || undefined,
        }}
        isPersonal={true}
      />
    </div>
  )
}
