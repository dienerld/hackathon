import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex w-2/3 mx-auto items-center justify-between p-5">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Hackathon</h1>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/" className="text-blue-500">
          Home
        </Link>
        <a href="#" className="text-blue-500">
          About
        </a>
        <a href="#" className="text-blue-500">
          Contact
        </a>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </header>
  )
}
