interface Option {
  label: string
  value: string
  correct: boolean
}

export interface Question {
  id: string
  name: string
  topicId: string
  level: 'easy' | 'medium' | 'hard'
  options: Option[]
}
export interface QuestionSelected {
  questionId: string
  selectedOption: Option
}
