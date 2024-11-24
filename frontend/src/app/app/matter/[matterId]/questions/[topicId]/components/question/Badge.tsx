import type { BadgeProps as UIBadgeProps } from '@/components/ui/badge'
import type { Question } from '../../../../entities/question'
import { Badge as UIBadge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const parseLevel = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

function getColor(level: Question['level']) {
  switch (level) {
    case 'easy':
      return 'bg-green-500 text-white'
    case 'medium':
      return 'bg-yellow-500 text-white'
    case 'hard':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

interface BadgeProps extends Omit<UIBadgeProps, 'className'> {
  level: Question['level']
}

export function Badge({ level, ...props }: BadgeProps) {
  return (
    <UIBadge
      variant="outline"
      className={cn('text-base', 'size-min', getColor(level))}
      {...props}
    >
      {parseLevel[level]}
    </UIBadge>
  )
}
