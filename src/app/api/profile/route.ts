import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// PATCH update model profile
export async function PATCH(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { bio, location, height, measurements, eyeColor, hairColor, instagram } = body

  const profile = await prisma.modelProfile.update({
    where: { userId: session.user.id! },
    data: { bio, location, height, measurements, eyeColor, hairColor, instagram },
  })

  return NextResponse.json(profile)
}
