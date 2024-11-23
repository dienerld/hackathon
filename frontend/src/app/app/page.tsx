'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function App() {
  const searchParams = useSearchParams()

  const isFirstLogin = searchParams.get('first_login') === 'true'
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Link href="/">Home</Link>
      <Link href="/app/matter/JQi72VmsDRpgjV3bvE">matérias</Link>
    </div>
  )
}
