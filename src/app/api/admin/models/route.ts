import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Admin: update model profile status (approve/reject)
export async function PATCH(request: NextRequest) {
  const session = await auth()
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { profileId, status } = body

  const profile = await prisma.modelProfile.update({
    where: { id: profileId },
    data: { status },
  })

  return NextResponse.json(profile)
}
