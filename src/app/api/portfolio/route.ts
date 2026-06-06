import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET my portfolio
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await prisma.modelProfile.findUnique({
    where: { userId: session.user.id! },
    include: { portfolioMedia: { orderBy: { createdAt: 'desc' } } },
  })

  return NextResponse.json(profile)
}

// DELETE media item
export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const mediaId = searchParams.get('id')
  if (!mediaId) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const profile = await prisma.modelProfile.findUnique({
    where: { userId: session.user.id! },
  })

  const media = await prisma.portfolioMedia.findFirst({
    where: { id: mediaId, modelProfileId: profile?.id },
  })

  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.portfolioMedia.delete({ where: { id: mediaId } })
  return NextResponse.json({ success: true })
}
