interface Question {
  id: string
  name: string
  topicId: string
}

export async function getQuestionsByTopic(topicId: string): Promise<Question[]> {
  try {
    const res = await fetch(`http://backend:8080/questions?topicId=${topicId}`)

    if (!res.ok) {
      throw new Error('Failed to fetch questions')
    }

    return res.json()
  }
  catch (error) {
    console.error(error)
    throw error
  }
}
