'use client'

import type { Topic } from '../entities/topic'
import { Card } from '@/components/ui/card'
import { useBreadcrumbs } from '@/contexts/breadcrumbs/useBreadcrumb'
import { redirect } from 'next/navigation'

interface TopicCardProps {
  topic: Topic
}
export function TopicCard({ topic }: TopicCardProps) {
  // const { addReference } = useBreadcrumbs()
  // addReference(topic.id, topic.name)
  return (
    <Card
      key={topic.id}
      is="li"
      className="w-full gap-4 p-4 hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-600 cursor-pointer"
      onClick={() => redirect(`/app/matter/${topic.matterId}/questions/${topic.id}`)}
    >
      <h2>{topic.name}</h2>
    </Card>
  )
}
