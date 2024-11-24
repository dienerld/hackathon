import process from 'node:process'
import { db, tables } from '..'
import { createClasse } from './class'
import { createMatter } from './matter'

interface SeedByClassroom {
  name: string
  id: string
  matters: {
    name: string
    id: string
    topics: {
      name: string
      id: string
      questions: typeof tables.question.$inferInsert[]
    }[]
  }[]
}

function generateQuestions(count: number, prefix = '') {
  const questions: typeof tables.question.$inferInsert[] = []
  const random = Math.floor(Math.random() * 3)
  const randomLevel = Math.floor(Math.random() * 3)

  for (let i = 0; i < count; i++) {
    questions.push({
      level: randomLevel === 0 ? 'easy' : randomLevel === 1 ? 'medium' : 'hard',
      type: 'multiple-choice',
      name: prefix ? `${prefix} | Pergunta ${i + 1}` : `Pergunta ${i + 1}`,
      topicId: '',
      options: [
        { value: 'A', label: 'A', correct: random === 0 },
        { value: 'B', label: 'B', correct: random === 1 },
        { value: 'C', label: 'C', correct: random === 2 },
        { value: 'D', label: 'D', correct: random === 3 },
      ],
    })
  }
  return questions
}
const seedByClassroom: SeedByClassroom[] = [
  {
    name: '5a Série',
    id: '',
    matters: [
      {
        name: 'Português',
        id: '',
        topics: [
          { name: 'Gêneros Textuais', id: '', questions: generateQuestions(10, 'Gêneros') },
          { name: 'Gramática', id: '', questions: generateQuestions(10, 'Gramática') },
        ],
      },
      {
        name: 'História',
        id: '',
        topics: [
          { name: 'A Formação do Território Brasileiro', id: '', questions: generateQuestions(10) },
          { name: 'O Período de Colonização', id: '', questions: generateQuestions(10) },
          { name: 'A Escravidão no Brasil', id: '', questions: generateQuestions(10, 'Escravidão Brasil') },
        ],
      },
    ],
  },
  {
    name: '6a Série',
    id: '',
    matters: [
      {
        name: 'Português',
        id: '',
        topics: [
          { name: 'Classes Gramaticais', id: '', questions: generateQuestions(10) },
          { name: 'Gramática Geral', id: '', questions: generateQuestions(10, 'Gramática') },
          { name: 'Tipos de Texto', id: '', questions: generateQuestions(10, 'Tipos de Texto') },
        ],
      },
      {
        name: 'História',
        id: '',
        topics: [
          { name: 'Civilizações Antigas', id: '', questions: generateQuestions(10, 'Civilizações Antigas') },
          { name: 'Grécia Antiga', id: '', questions: generateQuestions(10, 'Grécia Antiga') },
          { name: 'Idade Média', id: '', questions: generateQuestions(10, 'Idade Média') },
        ],
      },
    ],
  },
]

async function createTopic(name: string, matterId: string) {
  const [topic] = await db.insert(tables.topic)
    .values({ name, matterId })
    .returning({ id: tables.topic.id })
    .execute()

  return topic
}

async function create() {
  for (const classDb of seedByClassroom) {
    const classe = await createClasse(classDb.name)
    classDb.id = classe.id
    for (const matterDb of classDb.matters) {
      const matter = await createMatter(matterDb.name, classe.id)
      matterDb.id = matter.id
      for (const topicDb of matterDb.topics) {
        const topic = await createTopic(topicDb.name, matter.id)
        topicDb.id = topic.id
        topicDb.questions.forEach((question) => {
          question.topicId = topic.id
        })
        await db.insert(tables.question)
          .values(topicDb.questions)
          .returning({ id: tables.question.id })
          .execute()
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  console.log('Running with args:', args)

  if (args.length === 0) {
    console.log('Usage: yarn seed [ seed | truncate ]')
    process.exit(1)
  }
  if (args[0] === 'seed') {
    await create()
    console.log('Seeded!')
  }
  if (args[0] === 'truncate') {
    await db.delete(tables.answer).execute()
    await db.delete(tables.question).execute()
    await db.delete(tables.topic).execute()
    await db.delete(tables.matter).execute()
    await db.delete(tables.classroom).execute()
    await db.delete(tables.user).execute()
    console.log('Truncated!')
  }

  process.exit(0)
}

main()
