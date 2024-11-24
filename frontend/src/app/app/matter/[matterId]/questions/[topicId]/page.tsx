'use client'

import type { Question } from '../../entities/question'
import { getQuestionsByTopic } from '@/services/question.service'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Questions() {
  const { topicId } = useParams()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (!topicId) {
      return
    }

    getQuestionsByTopic(topicId as string).then((res) => {
      setQuestions(res)
    })
  }, [topicId])

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Perguntas</h1>
      <ul className="list-none list-inside flex flex-col sm:flex-row gap-4 mt-4 ">
        {questions.map(question => (
          <li key={question.id}>{question.name}</li>
        ))}
      </ul>
    </div>
  )
}
