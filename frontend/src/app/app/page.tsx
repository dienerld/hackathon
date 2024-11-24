'use client'
import type { MatterTypes } from '@/types'
import { CardClass } from '@/components/CardClass'
import { DialogRegister } from '@/components/DialogRegister'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function App() {
  const [id, setId] = useState('')
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState<MatterTypes[]>([
    {
      id: '',
      name: '',
      description: '',
    },
  ])

  useEffect(() => {
    async function data() {
      const response = await fetch(`http://localhost:8080/matters`)
      const json = await response.json()

      setData(json)
    }

    data()
  }, [])

  function handleMatter(id: string) {
    if (!id) {
      setAlert(!alert)
    }

    redirect(`/app/matter/${id}`)
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {id
        ? (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Não foi possível encontrar o conteúdo
              </AlertDescription>
            </Alert>
          )
        : (
            ''
          )}
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
      {/* <DialogRegister /> */}
      <DialogRegister />
    </div>
  )
}
