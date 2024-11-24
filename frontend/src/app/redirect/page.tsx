'use client'

import { SplashScreen } from '@/components/SplashScreen'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { useEffect } from 'react'

export default function Redirect() {
  const user = useUser()

  async function fetchData() {
    const res = await fetch(`http://localhost:8080/users/${user.user?.id}`)

    const json = await res.json()
    if (!res.ok) {
      return {
        error: json,
        data: null,
      }
    }
    return {
      data: json,
      error: null,
    }
  }
  useEffect(() => {
    if (!user.user) {
      return
    }

    fetchData().then((res) => {
      if (res.error) {
        redirect('/app?first_login=true')
      }

      localStorage.setItem('user', JSON.stringify(res.data))
      redirect('/app')
    })
  }, [user.user])

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-24">
      <h1>Redirecting...</h1>
      <SplashScreen />
    </div>
  )
}
