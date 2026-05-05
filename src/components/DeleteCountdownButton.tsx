'use client'

import { useRouter } from 'next/navigation'

interface DeleteCountdownButtonProps {
  id: number
  apiEndpoint: string
}

export default function DeleteCountdownButton({ id, apiEndpoint }: DeleteCountdownButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('确定要删除这个倒数日吗？')) {
      return
    }

    try {
      const response = await fetch(`${apiEndpoint}?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/countdowns')
      } else {
        const error = await response.json()
        alert(error.error || '删除失败')
      }
    } catch (error) {
      console.error('Error deleting countdown:', error)
      alert('删除失败')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      删除
    </button>
  )
}
