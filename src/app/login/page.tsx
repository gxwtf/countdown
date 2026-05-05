'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const back = searchParams.get('back') || '/countdowns'

  useEffect(() => {
    const domain = window.location.host
    window.location.replace(`https://account.gxwtf.cn/sso/login?system=${domain}&back=${back}`)
  }, [back])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">正在重定向...</h1>
      <p className="text-center text-gray-500">正在准备您的页面，请耐心等待</p>
    </div>
  )
}
