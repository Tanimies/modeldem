import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const caption = formData.get('caption') as string || ''
    const isCover = formData.get('isCover') === 'true'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    const mediaType = file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE'
    const url = `/uploads/${filename}`

    // Get model profile for session user
    const profile = await prisma.modelProfile.findUnique({
      where: { userId: session.user.id! },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Model profile not found' }, { status: 404 })
    }

    // If setting as cover, update existing cover
    if (isCover && mediaType === 'IMAGE') {
      await prisma.portfolioMedia.updateMany({
        where: { modelProfileId: profile.id, isCover: true },
        data: { isCover: false },
      })
      await prisma.modelProfile.update({
        where: { id: profile.id },
        data: { coverImage: url },
      })
    }

    const media = await prisma.portfolioMedia.create({
      data: {
        modelProfileId: profile.id,
        type: mediaType,
        url,
        caption,
        isCover: isCover && mediaType === 'IMAGE',
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
