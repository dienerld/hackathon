import type { PropsWithChildren } from 'react'
import Image from 'next/image'

type MainContentProps = PropsWithChildren<{
  header?: React.ReactNode
}>

export function MainContent({ children, header }: MainContentProps) {
  return (
    <div className="flex flex-col flex-1">

      {header && <div className="w-full">{header}</div>}
      <div className="h-max w-full flex-1 flex">
        <main className="mx-auto max-w-screen-xl p-5 flex-1">{children}</main>
      </div>

    </div>
  )
}
