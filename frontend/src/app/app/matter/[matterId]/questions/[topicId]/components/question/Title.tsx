import type { Question } from '@/app/app/matter/[matterId]/entities/question'
import { cn } from '@/lib/utils'

interface TitleProps {
  topic: string
  description: string
  level: Question['level']
}

type h2Props = React.HTMLAttributes<HTMLHeadingElement>
export function Title({ topic, description, level, className, ...props }: TitleProps & h2Props) {
  return (
    <h2 className={cn('text-base font-medium text-left', className)} {...props}>
      {description}
    </h2>
  )
}
