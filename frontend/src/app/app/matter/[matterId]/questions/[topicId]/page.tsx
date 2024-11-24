'use client'

import type { Question, QuestionSelected } from '../../entities/question'
import { DialogQuestion } from '@/components/DialogQuestion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { getQuestionsByTopic, saveQuestionsAnswer } from '@/services/question.service'
import { useUser } from '@clerk/nextjs'
import { redirect, useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Questions() {
  const pathname = usePathname()
  const { topicId } = useParams()
  const { user } = useUser()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [optionSelected, setOptionSelected] = useState<QuestionSelected>()
  const [optionsSelected, setOptionsSelected] = useState<QuestionSelected[]>([])
  const [report, setReport] = useState({
    loading: false,
    total: 0,
    corrects: 0,
    score: 0,
  })

  function handleSelectOption({ selectedOption }: Omit<QuestionSelected, 'questionId'>) {
    setOptionSelected({ questionId: questions[currentQuestion].id, selectedOption })
  }

  function handleNextQuestion() {
    if (!optionSelected)
      return

    // Temporario
    if (optionSelected.selectedOption.correct) {
      toast({
        title: 'Resposta correta!',
        description: 'Parabéns, você acertou!',
      })
    }
    else {
      toast({ title: 'Resposta incorreta!' })
    }

    setOptionsSelected([...optionsSelected, optionSelected])
    setOptionSelected(undefined)
    setCurrentQuestion(currentQuestion + 1)
  }

  function handleClose() {
    setCurrentQuestion(0)
    setOptionsSelected([])
    setOpen(false)
    redirect(pathname.replace(/\/questions\/.*/, ''))
  }

  useEffect(() => {
    if (!topicId) {
      return
    }

    getQuestionsByTopic(topicId as string).then((res) => {
      setQuestions(res)
    })
  }, [topicId])

  useEffect(() => {
    if (currentQuestion === 0 || currentQuestion < questions.length)
      return

    setReport(prev => ({ ...prev, loading: true }))

    saveQuestionsAnswer({ answers: optionsSelected, externalId: user!.id }).then((res) => {
      setReport({
        ...res,
        loading: false,
      })

      toast({
        title: 'Respostas salvas!',
        description: 'Suas respostas foram salvas com sucesso!',
      })
    })

    setTimeout(() => {
      setOpen(true)
    }, 1000)
  }, [currentQuestion, questions])

  const parseLevel = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  }

  function getColor(level: Question['level']) {
    switch (level) {
      case 'easy':
        return 'bg-green-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-white'
      case 'hard':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="flex flex-1 h-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Perguntas</h1>
      <div className="w-full h-full flex flex-col justify-center items-center flex-1">
        {questions.length && currentQuestion < questions.length
          ? (
              <div>
                <span>
                  {currentQuestion + 1}
                  /
                  {questions.length}
                </span>

                <h2>
                  {questions[currentQuestion]?.name}
                  <Badge
                    variant="outline"
                    className={cn('ml-2', 'text-base', getColor(questions[currentQuestion]?.level))}
                  >
                    {parseLevel[questions[currentQuestion]?.level]}
                  </Badge>

                </h2>

                <div className="flex flex-col gap-2 my-4">
                  {questions[currentQuestion]?.options.map(option => (
                    <div key={option.value}>
                      <Button
                        variant={optionSelected?.selectedOption.value === option.value ? 'default' : 'outline'}
                        onClick={() => handleSelectOption({ selectedOption: option })}
                      >
                        {option.label}
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleNextQuestion}
                  disabled={!optionSelected || currentQuestion + 1 === questions.length + 1}
                >
                  Próxima
                </Button>
              </div>
            )
          : (
              <div>Loading...</div>
            )}
      </div>
      <DialogQuestion open={open} onClose={handleClose} report={report} />
    </div>
  )
}
