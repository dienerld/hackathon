'use client'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { getClassrooms } from '@/services/classroom.service'
import { registerUser } from '@/services/user.service'
import { useUser } from '@clerk/nextjs'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export function DialogRegister() {
  const { toast } = useToast()
  const { user } = useUser()
  const searchParams = useSearchParams()
  const isFirstLogin = searchParams.get('first_login') === 'true'

  const [options, setOptions] = useState<{ value: string, label: string }[]>([])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    classroomId: '',
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      ...form,
      externalId: user!.id,
    }

    registerUser(data).then((res) => {
      if (res.error) {
        toast({
          title: 'Erro ao completar cadastro',
          description: 'Ocorreu um erro ao completar seu cadastro, tente novamente',
        })
        return
      }

      toast({
        title: 'Cadastro completo',
        description: 'Seu cadastro foi completado com sucesso',
      })
      redirect('/app')
    })
  }

  function handleChange(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === 'string' ? e : e.target.value
      setForm({
        ...form,
        [key]: value,
      })
    }
  }

  useEffect(() => {
    if (!user)
      return

    setForm({
      ...form,
      firstName: user.firstName!,
      lastName: user.lastName!,
      email: user.emailAddresses[0].emailAddress,
    })
  }, [user])

  useEffect(() => {
    getClassrooms().then((res) => {
      if (res.error) {
        console.error(res.error)
        return
      }

      setOptions(res.data.map((classroom: any) => ({
        value: classroom.id,
        label: classroom.name,
      })))
    })
  }, [])

  return (
    <Dialog
      open={isFirstLogin}
    >
      <DialogContent className="flex flex-col gap-10 p-16 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Bem Vindo</DialogTitle>
          <DialogDescription
            className="text-center"
          >
            Complete seu cadastro para continuar
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <Input placeholder="Nome" value={form.firstName} onChange={handleChange('firstName')} />
          <Input placeholder="Sobrenome" value={form.lastName} onChange={handleChange('lastName')} />
          <Input placeholder="E-mail" disabled value={form.email} />
          <Select value={form.classroomId} onValueChange={handleChange('classroomId')}>
            <SelectTrigger className={cn('w-full', !form.classroomId && 'text-slate-500')}>
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="w-full"
            disabled={!form.firstName || !form.lastName || !form.classroomId}
          >
            Continuar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
