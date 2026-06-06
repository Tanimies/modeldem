import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET all applications (admin only)
export async function GET(request: NextRequest) {
  const session = await auth()
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(applications)
}

// POST new application (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, age, height, location, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const application = await prisma.application.create({
      data: { name, email, phone, age, height, location, message },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH update application status (admin only)
export async function PATCH(request: NextRequest) {
  const session = await auth()
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { id, status } = body

  const application = await prisma.application.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(application)
}
