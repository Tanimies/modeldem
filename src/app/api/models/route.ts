import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET - fetch all approved models (public) or all models (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const isAdmin = (session?.user as any)?.role === 'ADMIN'

    const models = await prisma.modelProfile.findMany({
      where: isAdmin ? {} : { status: 'APPROVED' },
      include: {
        user: { select: { name: true, email: true } },
        portfolioMedia: { where: { type: 'IMAGE' }, take: 6 },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(models)
  } catch (error) {
    console.error('Models GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
