'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { LucideMenu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavDrawer } from './header/drawer'
import { Button } from './ui/button'

export function Header() {
  const path = usePathname()

  function isActive(href: string) {
    return path === href
  }

  const [drawerOpen, setDrawerOpen] = useState(false)
  const routes = [
    { name: 'Inicio', href: '/' },
    { name: 'Matérias', href: '/app/matter' },
    { name: 'Classificação', href: '/app/ranking' },
    { name: 'Amigos', href: '/app/friends' },
  ]

  return (
    <header className="flex w-full lg:w-2/3 mx-auto items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Hackathon</h1>
      </div>

      <div className="hidden md:flex items-center gap-5">
        {routes.map(route => (
          <Link
            key={route.name}
            href={route.href}
            className={isActive(route.href) ? 'text-blue-500' : 'text-gray-500'}
          >
            {route.name}
          </Link>
        ))}

        <SignedOut>
          <Link href="/sign-up">
            Sign Up
          </Link>
          <Link href="/sign-in">
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <Button className="block md:hidden" variant="ghost" onClick={() => setDrawerOpen(true)}>
        <LucideMenu />
      </Button>
      <NavDrawer routes={routes} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </header>
  )
}
