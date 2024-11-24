import type { PropsWithChildren } from 'react'
import { Header } from '@/components/header'
import { MainContent } from '@/components/MainContent'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: PropsWithChildren) {
  const user = await currentUser()

  if (user) {
    redirect('/app')
  }

  return (
    <MainContent header={<Header routes={[]} useDrawer={false} />}>
      {children}
    </MainContent>
  )
}
