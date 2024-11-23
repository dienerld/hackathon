import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()

  return (
    <>
      <h1>Home</h1>
      <p>
        {' '}
        User ID:
        {user?.fullName}
      </p>
    </>
  )
}
