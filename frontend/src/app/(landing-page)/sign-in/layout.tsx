import type { PropsWithChildren } from 'react'
import { MainContent } from '@/components/MainContent'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const user = await currentUser()

  if (user) {
    redirect('/app')
  }

  return (
    <div className="w-full h-full ">
      {children}
    </div>
  )
}
