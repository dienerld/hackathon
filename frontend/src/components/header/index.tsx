'use client'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { LucideMenu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { NavDrawer } from './drawer'

export interface Route {
  name: string
  href: string
}

interface HeaderProps {
  routes: Route[]
  useDrawer?: boolean
}
export function Header({ routes, useDrawer = true }: HeaderProps) {
  const path = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  function isActive(href: string) {
    return path === href
  }

  const configVisible = useDrawer ? 'hidden md:flex' : 'flex'

  return (
    <header className="flex w-full max-w-screen-xl mx-auto items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Hackathon</h1>
      </div>

      <div className={cn('items-center gap-5', configVisible)}>
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

      {useDrawer && (
        <>
          <Button className="block md:hidden" variant="ghost" onClick={() => setDrawerOpen(true)}>
            <LucideMenu />
          </Button>
          <NavDrawer routes={routes} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </>
      )}

    </header>
  )
}
