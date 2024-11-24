import type { Question, QuestionSelected } from '@/app/app/matter/[matterId]/entities/question'

interface ResponseQuestionsByTopic {
  data: {
    className: string
    matterName: string
    topicName: string
    questions: Question[]
  }
  error: {
    message: string
  } | null
}
export async function getQuestionsByTopic(topicId: string): Promise<ResponseQuestionsByTopic> {
  try {
    const res = await fetch(`http://localhost:8080/questions?topicId=${topicId}`)

    if (!res.ok) {
      throw new Error('Failed to fetch questions')
    }

    const json = await res.json()

    return { data: json, error: null }
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export async function saveQuestionsAnswer(questionSelected: { answers: QuestionSelected[], externalId: string }) {
  try {
    const res = await fetch('http://localhost:8080/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionSelected),
    })
    const json = await res.json()

    if (!res.ok) {
      throw new Error('Failed to save answers')
    }

    return json
  }
  catch (error) {
    console.error(error)
    throw error
  }
}
