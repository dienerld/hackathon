import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface CardClassProps {
  item: {
    id: string
    name: string
    description?: string
  }
  href: string
}

export function NavigationCard({ item, href }: CardClassProps) {
  return (
    <Link href={href}>
      <Card className="w-full p-4 text-center hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-600 cursor-pointer">
        <h1>{item.name}</h1>
        {item?.description}
      </Card>
    </Link>
  )
}
