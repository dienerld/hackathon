import { Progress } from '@/components/ui/progress'

interface SliderConclusionProps {

  to: number
  current: number
}
export function SliderConclusion({ to, current }: SliderConclusionProps) {
  const value = Math.round((current / to) * 100)
  return (
    <Progress value={value} max={100} className="w-full" />
  )
}
