'use client'

import type { Question, QuestionSelected } from '../../entities/question'
import { DialogQuestion } from '@/components/DialogQuestion'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { getQuestionsByTopic, saveQuestionsAnswer } from '@/services/question.service'
import { useUser } from '@clerk/nextjs'
import { redirect, useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge } from './components/question/Badge'
import { Option } from './components/question/Option'
import { Title } from './components/question/Title'
import { SliderConclusion } from './components/SliderConclusion'

export default function Questions() {
  const pathname = usePathname()
  const { topicId } = useParams()
  const { user } = useUser()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [metadataQuestions, setMetadataQuestion] = useState({
    className: '',
    matterName: '',
    topicName: '',
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [optionSelected, setOptionSelected] = useState<QuestionSelected>()
  const [optionsSelected, setOptionsSelected] = useState<QuestionSelected[]>([])
  const [report, setReport] = useState({
    loading: false,
    total: 0,
    corrects: 0,
    score: 0,
  })

  function handleSelectOption(option: QuestionSelected['selectedOption']) {
    setOptionSelected({ questionId: questions[currentQuestion].id, selectedOption: option })
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
      console.log(res)

      setQuestions(res.data.questions)
      setMetadataQuestion({
        className: res.data.className,
        matterName: res.data.matterName,
        topicName: res.data.topicName,
      })
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

  return (
    <div className="flex flex-1 h-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Perguntas</h1>
      <div className="w-full h-full flex flex-col justify-center items-center flex-1">
        {questions.length && currentQuestion < questions.length
          ? (
              <div className="w-full mb-4 text-center">
                <h2 className="text-xl font-bold">
                  {metadataQuestions.className}
                  {' '}
                  /
                  {' '}
                  {metadataQuestions.matterName}
                  {' '}
                  /
                  {' '}
                  {metadataQuestions.topicName}
                </h2>
                <SliderConclusion to={questions.length} current={currentQuestion} />
                <div className="flex flex-col gap-2 mt-4">
                  <Badge level={questions[currentQuestion]?.level} />

                  <Title
                    topic="Perguntas"
                    description="Uma pergunta é um problema que você quer resolver, e a resposta é a solução para o problema."
                    level={questions[currentQuestion]?.level}
                    className="text-pretty font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-2 my-4">
                  {questions[currentQuestion]?.options.map(option => (
                    <Option
                      key={option.value}
                      option={option}
                      onClick={handleSelectOption}
                      checked={optionSelected?.selectedOption.value === option.value}
                    />
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
