import { DialogRegister } from '@/components/DialogRegister'
import { getMatters } from '@/services/matter.service'
import { currentUser } from '@clerk/nextjs/server'
import { NavigationCard } from './components/navigation-card'

export default async function App() {
  const user = await currentUser()
  const matters = await getMatters(user?.id)
  if (matters.error) {
    return <div>{JSON.stringify(matters.error)}</div>
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-3xl">Disciplinas</h1>
      <nav className="list-none grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {matters?.data?.map(item => (
          <NavigationCard
            item={item}
            key={item.id}
            href={`/app/matter/${item.id}`}
          />
        ))}
      </nav>
      <DialogRegister />
    </div>
  )
}
