'use client'

export default function LandingPage() {
  localStorage.removeItem('user')
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Welcome to Hackathon</h1>
    </div>
  )
}
