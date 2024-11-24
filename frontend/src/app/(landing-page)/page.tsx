'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const handleSigin = () => {
    router.push('/sign-in')
  }
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <h1 className="font-bold text-3xl">Welcome to Hackathon</h1>
      <Button onClick={handleSigin}>Login</Button>
    </div>
  )
}
