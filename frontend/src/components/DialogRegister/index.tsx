'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Progress } from '../ui/progress'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'apple1', label: 'Apple 1' },
  { value: 'apple2', label: 'Apple 2' },
  { value: 'apple3', label: 'Apple 3' },
]

export function DialogRegister() {
  const searchParams = useSearchParams()
  const isFirstLogin = searchParams.get('first_login') === 'true'

  const [progress, setProgress] = useState(50)
  const [form, setForm] = useState({
    name: '',
    username: '',
  })

  return (
    <Dialog
      open={isFirstLogin}
    >
      <DialogContent className="flex flex-col gap-10 p-16 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Gameficação Educacional</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">

          <Input id="firtsName" placeholder="Nome" />
          <Input id="lastName" placeholder="Sobrenome" />
          <Input id="email" placeholder="E-mail" />

          {/* <Select>
            <SelectTrigger className="w-full text-zinc-400">
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}

          <Button type="submit" className="w-full">Continuar</Button>
        </div>
        <div className="w-full flex justify-center">
          <Progress value={progress} className="w-[40%]" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
