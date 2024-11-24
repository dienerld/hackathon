import type { PropsWithChildren } from 'react'
import { Header } from '@/components/header'
import { MainContent } from '@/components/MainContent'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: PropsWithChildren) {
  const user = await currentUser()
  const routes = [
    { name: 'Inicio', href: '/app' },
    { name: 'Matérias', href: '/app/matter' },
    { name: 'Classificação', href: '/app/ranking' },
    { name: 'Amigos', href: '/app/friends' },
  ]

  if (!user) {
    redirect('/')
  }
  return (
    <MainContent header={<Header routes={routes} />}>
      {children}
    </MainContent>
  )
}
