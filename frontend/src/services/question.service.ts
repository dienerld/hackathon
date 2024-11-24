import type { Question, QuestionSelected } from '@/app/app/matter/[matterId]/entities/question'

export async function getQuestionsByTopic(topicId: string): Promise<Question[]> {
  try {
    const res = await fetch(`http://localhost:8080/questions?topicId=${topicId}`)

    if (!res.ok) {
      throw new Error('Failed to fetch questions')
    }

    const json = await res.json()

    return json
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export async function saveQuestionsAnswer(questionSelected: { answers: QuestionSelected[], externalId: string }): Promise<void> {
  try {
    const res = await fetch('http://localhost:8080/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionSelected),
    })

    if (!res.ok) {
      throw new Error('Failed to save questions')
    }
  }
  catch (error) {
    console.error(error)
    throw error
  }
}
