'use client'

import { useRouter } from 'next/navigation'
import CountdownForm from '@/components/CountdownForm'

interface EditCountdownFormProps {
  countdown: {
    id: number
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }
  isPersonal: boolean
}

export default function EditCountdownForm({ countdown, isPersonal }: EditCountdownFormProps) {
  const router = useRouter()

  const handleSubmit = async (data: {
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }) => {
    try {
      const apiEndpoint = isPersonal ? '/api/personal-countdowns' : '/api/countdowns'
      const response = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: countdown.id,
          ...data,
        }),
      })
      
      if (response.ok) {
        router.push('/countdowns')
      } else {
        const error = await response.json()
        alert(error.error || '更新失败')
      }
    } catch (error) {
      console.error('Error updating countdown:', error)
      alert('更新失败')
    }
  }

  return <CountdownForm initialData={countdown} onSubmit={handleSubmit} />
}
