import type { Question } from '@/app/app/matter/[matterId]/entities/question'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface OptionProps {
  option: Question['options'][number]
  onClick: (option: Question['options'][number]) => void
  checked?: boolean
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>

export function Option({ option, checked, onClick, className, ...props }: OptionProps & HTMLProps) {
  return (
    <label
      htmlFor={option.value}
      className="text-sm font-medium leading-none cursor-pointer"
      onClick={() => onClick(option)}
    >
      <Card
        className={cn('flex items-center gap-4 p-4 hover:bg-neutral-100 hover:shadow-md dark:hover:bg-neutral-600 cursor-pointer', className)}
        {...props}
      >
        <Checkbox id={option.value} checked={checked} />
        {option.label}
      </Card>
    </label>
  )
}
