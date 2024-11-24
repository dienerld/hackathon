import type { Topic } from './entities/topic'
import { envs } from '@/envs'
import { notFound } from 'next/navigation'
import { NavigationCard } from '../../components/navigation-card'

interface MatterParams {
  matterId: string
}

interface TopicsProps {
  params: Promise<MatterParams>
}

export default async function Topics({ params }: TopicsProps) {
  const { matterId } = await params

  const filters = new URLSearchParams()
  filters.append('matterId', matterId)
  const data = await fetch(
    `${envs.SERVER_API_URL}/topics?${filters.toString()}`,
  )
  if (!data.ok) {
    notFound()
  }

  const topics = (await data.json()) as Topic[]

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Tópicos</h1>
      <nav className="list-none grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {topics.map(topic => (
          <NavigationCard
            key={topic.id}
            item={topic}
            href={`/app/matter/${topic.matterId}/questions/${topic.id}`}
          />
        ))}
      </nav>
    </div>
  )
}
