'use client'
import { useSearchParams } from 'next/navigation'

export default function App() {
  const searchParams = useSearchParams()

  const isFirstLogin = searchParams.get('first_login') === 'true'
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {isFirstLogin && <h1>Crie sua conta</h1>}
      {!isFirstLogin && <h1>Bem vindo</h1>}
    </div>
  )
}
