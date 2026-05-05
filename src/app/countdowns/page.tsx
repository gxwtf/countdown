import { CountdownCard } from '@/components/CountdownCard'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'
import UserNav from '@/components/UserNav'

export const dynamic = 'force-dynamic'

export default async function CountdownsPage() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  
  const publicCountdowns = await prisma.countdown.findMany({
    orderBy: {
      targetDate: 'asc',
    },
  })

  let personalCountdowns: any[] = []
  if (session.isLoggedIn) {
    personalCountdowns = await prisma.personalCountdown.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: {
        targetDate: 'asc',
      },
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">倒数日</h1>
        <div className="flex items-center gap-4">
          <UserNav
            isLoggedIn={session.isLoggedIn}
            username={session.username}
            admin={session.admin}
          />
        </div>
      </div>

      {session.isLoggedIn && personalCountdowns.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">我的倒数日</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalCountdowns.map((countdown) => (
              <CountdownCard
                key={countdown.id}
                id={countdown.id}
                title={countdown.title}
                targetDate={countdown.targetDate}
                backgroundColor={countdown.backgroundColor || undefined}
                backgroundImage={countdown.backgroundImage || undefined}
                isPersonal={true}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">公共倒数日</h2>
        {publicCountdowns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">还没有创建任何公共倒数日</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicCountdowns.map((countdown) => (
              <CountdownCard
                key={countdown.id}
                id={countdown.id}
                title={countdown.title}
                targetDate={countdown.targetDate}
                backgroundColor={countdown.backgroundColor || undefined}
                backgroundImage={countdown.backgroundImage || undefined}
                isAdmin={session.admin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
