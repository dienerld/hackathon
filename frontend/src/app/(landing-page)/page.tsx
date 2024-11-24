import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <h1 className="font-bold text-3xl">Welcome to Hackathon</h1>
      <div className="flex justify-evenly w-full">
        <Link href="/sign-in"><Button>Login</Button></Link>
        <Link href="/sign-up"><Button>Sign Up</Button></Link>
      </div>
    </div>
  )
}
