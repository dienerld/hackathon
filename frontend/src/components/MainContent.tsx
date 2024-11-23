import type { PropsWithChildren } from 'react'

type MainContentProps = PropsWithChildren<{
  header?: React.ReactNode
}>

export function MainContent({ children, header }: MainContentProps) {
  return (
    <div className="flex size-full flex-col">
      {header && <div className="flex-1">{header}</div>}
      <div className="h-max w-full flex-1">
        <main className="mx-auto size-full max-w-screen-xl p-5">{children}</main>
      </div>
    </div>
  )
}
