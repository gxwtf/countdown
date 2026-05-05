import Link from 'next/link'
import { getRemainingDays, getContrastColor } from '@/lib/utils'

interface CountdownCardProps {
  id: number
  title: string
  targetDate: Date
  backgroundColor?: string
  backgroundImage?: string
  isPersonal?: boolean
  isAdmin?: boolean
}

export function CountdownCard({
  id,
  title,
  targetDate,
  backgroundColor,
  backgroundImage,
  isPersonal = false,
  isAdmin = false,
}: CountdownCardProps) {
  const textColor = getContrastColor(backgroundColor || backgroundImage || '')
  const detailHref = isPersonal ? `/personal/${id}` : `/countdowns/${id}`
  
  return (
    <Link
      href={detailHref}
      className={`relative rounded-lg shadow-lg overflow-hidden h-48 flex flex-col justify-center items-center transition-transform hover:scale-105`}
      style={{
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`absolute inset-0 ${backgroundImage ? 'bg-black/30' : ''}`} />
      <div className={`relative z-10 p-4 text-center ${textColor}`}>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-1">目标日期: {targetDate.toLocaleDateString()}</p>
        <p className="text-4xl font-bold">
          {getRemainingDays(targetDate)}
        </p>
        {isPersonal && (
          <p className="text-sm mt-2 opacity-75">个人倒数日</p>
        )}
        {isAdmin && !isPersonal && (
          <p className="text-sm mt-2 opacity-75">公共倒数日</p>
        )}
      </div>
    </Link>
  )
}
