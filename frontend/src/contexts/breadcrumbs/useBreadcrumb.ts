import { createContext, useContext } from 'react'

export interface BreadcrumbContextProps {
  reference: Record<string, string>
  addReference: (id: string, name: string) => void
  removeReference: (id: string) => void
}

export const BreadcrumbContext = createContext({} as BreadcrumbContextProps)

export function useBreadcrumbs() {
  return useContext(BreadcrumbContext)
}
