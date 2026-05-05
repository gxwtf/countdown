'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/countdowns')
        router.refresh()
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
    >
      登出
    </button>
  )
}
