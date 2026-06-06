import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminClient from './AdminClient'

export const metadata = {
  title: 'Admin Panel — Elite Maison',
}

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) redirect('/login')
  if ((session.user as any).role !== 'ADMIN') redirect('/dashboard')

  return (
    <AdminClient
      user={{
        name: session.user.name!,
        email: session.user.email!,
        role: (session.user as any).role,
      }}
    />
  )
}
