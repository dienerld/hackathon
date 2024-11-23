import { SignedIn, UserButton } from '@clerk/nextjs'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer'

interface Route {
  name: string
  href: string
}

interface NavDrawerProps {
  routes: Route[]
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}
export function NavDrawer({ routes, drawerOpen, setDrawerOpen }: NavDrawerProps) {
  const path = usePathname()

  function isActive(href: string) {
    return path === href
  }
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="flex flex-col gap-2">
        <DrawerHeader className="text-center">
          <DrawerTitle>Páginas</DrawerTitle>
          <DrawerDescription>Navegue pelas páginas do aplicativo</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col gap-2">
          {routes.map(route => (
            <Link key={route.name} href={route.href} className="mx-auto">
              <Button variant="link" size="default" onClick={() => setDrawerOpen(false)} className={isActive(route.href) ? 'text-blue-500' : 'text-gray-500'}>
                {route.name}
              </Button>
            </Link>
          ))}
        </ul>
        <hr />
        <div className="mx-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <DrawerFooter className="w-1/2 mx-auto">
          <DrawerClose asChild>
            <Button variant="default">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
