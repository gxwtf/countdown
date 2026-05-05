import Link from 'next/link'
import { getRemainingDays, getContrastColor } from '@/lib/utils'
import DeleteCountdownButton from './DeleteCountdownButton'

interface CountdownDetailProps {
  id: number
  title: string
  targetDate: Date
  backgroundColor?: string | null
  backgroundImage?: string | null
  isPersonal: boolean
  canEdit: boolean
  editHref: string
  deleteApiEndpoint: string
}

export default function CountdownDetail({
  id,
  title,
  targetDate,
  backgroundColor,
  backgroundImage,
  isPersonal,
  canEdit,
  editHref,
  deleteApiEndpoint,
}: CountdownDetailProps) {
  const textColor = getContrastColor(backgroundColor || backgroundImage || '')

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`absolute inset-0 ${
          backgroundImage ? 'bg-black/30' : ''
        }`}
      />
      
      <div className={`relative z-10 text-center max-w-md w-full ${textColor}`}>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        <div className="text-6xl font-bold mb-8">
          {getRemainingDays(targetDate)}
        </div>
        
        <p className="text-xl mb-2">
          目标日期: {targetDate.toLocaleDateString()}
        </p>

        <p className="text-sm opacity-75 mb-4">
          {isPersonal ? '个人倒数日' : '公共倒数日'}
        </p>

        {canEdit && (
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href={editHref}
              className={`px-4 py-2 rounded-md ${textColor} border ${textColor.replace('text', 'border')} hover:bg-white/10`}
            >
              编辑
            </Link>
            <DeleteCountdownButton id={id} apiEndpoint={deleteApiEndpoint} />
          </div>
        )}
        
        <Link
          href="/countdowns"
          className={`mt-6 inline-block ${textColor} hover:underline`}
        >
          ← 返回列表
        </Link>
      </div>
    </div>
  )
}
