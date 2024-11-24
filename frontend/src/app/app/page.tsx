'use client'

import type { MatterTypes } from '@/types'
import { CardClass } from '@/components/CardClass'
import { DialogRegister } from '@/components/DialogRegister'
import { getMatters } from '@/services/matter.service'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function App() {
  const { user } = useUser()
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState<MatterTypes[]>([])

  function handleMatter(id: string) {
    if (!id) {
      setAlert(!alert)
    }

    redirect(`/app/matter/${id}`)
  }

  useEffect(() => {
    if (!user)
      return

    getMatters(user.id).then((res) => {
      if (res.error) {
        return
      }
      setData(res.data)
    })
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-semibold text-3xl">Disciplinas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4">
        {data.map(item => (
          <CardClass
            classe={item}
            key={item.id}
            action={() => handleMatter(item.id)}
          />
        ))}
      </div>
      <DialogRegister />
    </div>
  )
}
