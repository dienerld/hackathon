/* eslint-disable react/no-unstable-context-value */
'use client'
import { type PropsWithChildren, useState } from 'react'
import { BreadcrumbContext } from './useBreadcrumb'

type BreadcrumbContextType = PropsWithChildren
export function BreadcrumbProvider({ children }: BreadcrumbContextType) {
  const [idToNameMap, setIdToNameMap] = useState<Record<string, string>>({})

  function addReference(id: string, name: string) {
    setIdToNameMap(prev => ({ ...prev, [id]: name }))
  }

  function removeReference(id: string) {
    setIdToNameMap((prev) => {
      const newMap = { ...prev }
      delete newMap[id]
      return newMap
    })
  }

  return (
    <BreadcrumbContext.Provider value={{ reference: idToNameMap, addReference, removeReference }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
