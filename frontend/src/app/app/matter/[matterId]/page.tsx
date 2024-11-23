import type { Topic } from './entities/topic'
import { notFound } from 'next/navigation'
import { TopicCard } from './components/TopicCard'

interface MatterParams {
  matterId: string
}

export default async function Topics({ params }: { params: Promise<MatterParams> }) {
  const { matterId } = await params

  const filters = new URLSearchParams()
  filters.append('matterId', matterId)
  const data = await fetch(`http://backend:8080/topics?${filters.toString()}`)
  if (!data.ok) {
    notFound()
  }

  const topics = await data.json() as Topic[]

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Tópicos</h1>
      <ul className="list-none list-inside flex flex-col sm:flex-row gap-4 mt-4 ">
        {topics.map(topic => (<TopicCard key={topic.id} topic={topic} />))}
      </ul>
    </div>
  )
}
