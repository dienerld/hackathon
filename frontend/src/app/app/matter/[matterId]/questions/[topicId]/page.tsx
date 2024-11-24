'use client'

import type { Question } from '../../entities/question'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getQuestionsByTopic } from '@/services/question.service'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface QuestionSelected {
  questionId: string
  selectedOption: {
    label: string
    value: string
    correct: boolean
  }
}

export default function Questions() {
  const { topicId } = useParams()
  const { toast } = useToast()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [optionSelected, setOptionSelected] = useState<QuestionSelected>()
  const [optionsSelected, setOptionsSelected] = useState<QuestionSelected[]>([])

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

    setCurrentQuestion(currentQuestion + 1)
    setOptionsSelected([...optionsSelected, optionSelected])
    setOptionSelected(undefined)
  }

  useEffect(() => {
    if (!topicId) {
      return
    }

    getQuestionsByTopic(topicId as string).then((res) => {
      setQuestions(res)
    })
  }, [topicId])

  return (
    <div className="flex flex-1 h-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Perguntas</h1>

      <div className="w-full h-full flex flex-col justify-center items-center flex-1">
        {questions.length
          ? (
              <div>
                <h2>{questions[currentQuestion].name}</h2>

                <div className="flex flex-col gap-2 my-4">
                  {questions[currentQuestion].options.map(option => (
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
                  disabled={currentQuestion === questions.length - 1 || !optionSelected}
                >
                  Proximo
                </Button>
              </div>
            )
          : (
              <div>Loading...</div>
            )}
      </div>
    </div>
  )
}
