'use client'

import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

interface UserNavProps {
  isLoggedIn: boolean
  username?: string
  admin?: boolean
}

export default function UserNav({ isLoggedIn, username, admin }: UserNavProps) {
  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        登录
      </Link>
    )
  }

  return (
    <>
      <span className="text-sm text-gray-600">
        欢迎, {username}
        {admin && <span className="ml-1 text-blue-600">(管理员)</span>}
      </span>
      <Link
        href="/personal/new"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        新建个人倒数日
      </Link>
      {admin && (
        <Link
          href="/countdowns/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          新建公共倒数日
        </Link>
      )}
      <LogoutButton />
    </>
  )
}
