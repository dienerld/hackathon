import type { PropsWithChildren } from 'react'
import { Header } from '@/components/header'
import { MainContent } from '@/components/MainContent'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function LandingPageLayout({ children }: PropsWithChildren) {
  const user = await currentUser()

  if (user) {
    redirect('/app')
  }

  return (
    <div className="h-screen w-full flex">
      <main className="w-full md:w-1/2 flex justify-center items-center p-5">
        {children}
      </main>
      <div
        className="w-full md:w-1/2 h-screen bg-cover bg-center bg-[#1A1B26] hidden md:flex items-center justify-center"
      >
        <Image src="/logo-login2.png" alt="logo-login" width={400} height={400} />
      </div>
    </div>
  )
}
