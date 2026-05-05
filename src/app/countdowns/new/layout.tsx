import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/iron'

export const dynamic = 'force-dynamic'

export default async function NewCountdownLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  
  if (!session.admin) {
    redirect('/login?back=/countdowns/new')
  }

  return <>{children}</>
}
