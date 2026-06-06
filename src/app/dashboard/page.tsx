import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardClient from './DashboardClient'

export const metadata = {
  title: 'Dashboard — Elite Maison',
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const profile = await prisma.modelProfile.findUnique({
    where: { userId: session.user.id! },
    include: {
      portfolioMedia: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return (
    <DashboardClient
      user={{
        name: session.user.name!,
        email: session.user.email!,
        role: (session.user as any).role,
      }}
      profile={profile as any}
    />
  )
}
