'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

import * as React from 'react'

export function BreadcrumbApp() {
  // const { reference } = useBreadcrumbs()
  const paths = usePathname()
  const pathname = paths.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${pathname.slice(0, index + 1).join('/')}`}>
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== pathname.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>

  )
}
