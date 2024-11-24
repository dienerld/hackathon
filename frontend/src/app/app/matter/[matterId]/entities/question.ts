export interface Question {
  id: string
  name: string
  topicId: string
  options: {
    label: string
    value: string
    correct: boolean
  }[]
}
