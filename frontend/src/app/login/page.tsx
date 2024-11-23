'use client'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  async function handleLogin() {
    console.log('')
  }

  return (
    <Button onClick={() => handleLogin()}>Login</Button>
  )
}
