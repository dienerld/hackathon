import type { PropsWithChildren } from 'react'
import Image from 'next/image'

type MainContentProps = PropsWithChildren<{
  header?: React.ReactNode
  lp?: boolean
}>

export function MainContent({ children, header, lp = false }: MainContentProps) {
  return (
    <div className="flex flex-col flex-1">

      {lp
        ? (
            <div className="h-screen w-full flex">
              <main className="w-full md:w-1/2 flex justify-center items-center p-5">
                {children}
              </main>
              <div
                className="w-full md:w-1/2 h-screen bg-cover bg-center bg-[#1A1B26] hidden md:flex items-center justify-center"
              >
                <Image src="/logo-login2.png" alt="logo-login" width={400} height={400} />
              </div>
            </div>

          )
        : (
            <>
              {header && <div className="w-full">{header}</div>}
              <div className="h-max w-full flex-1 flex">
                <main className="mx-auto max-w-screen-xl p-5 flex-1">{children}</main>
              </div>
            </>
          )}
    </div>
  )
}
