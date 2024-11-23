import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp signInUrl="/sign-in" forceRedirectUrl="/redirect" signInForceRedirectUrl="/redirect" />
    </div>
  )
}
