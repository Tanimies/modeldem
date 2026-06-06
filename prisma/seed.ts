import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Elite Maison database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@elitemaison.com' },
    update: {},
    create: {
      email: 'admin@elitemaison.com',
      password: adminPassword,
      name: 'Elite Maison Admin',
      role: 'ADMIN',
      modelProfile: {
        create: {
          status: 'APPROVED',
          bio: 'Elite Maison Agency Administrator',
          location: 'Paris, France',
        },
      },
    },
  })
  console.log('✅ Admin created:', admin.email)

  // Create sample models
  const models = [
    {
      email: 'elena@elitemaison.com',
      name: 'Elena Rostova',
      location: 'Paris, France',
      height: "5'11\"",
      measurements: '33-24-35',
      eyeColor: 'Blue-grey',
      hairColor: 'Dark Brown',
      bio: 'Elena Rostova is a leading editorial model with campaigns for Chanel, Dior, and Saint Laurent.',
      status: 'APPROVED' as const,
    },
    {
      email: 'julian@elitemaison.com',
      name: 'Julian Vance',
      location: 'Milan, Italy',
      height: "6'1\"",
      measurements: '40-32-38',
      eyeColor: 'Green',
      hairColor: 'Dark Brown',
      bio: 'Julian Vance has established himself as one of the most sought-after male models in European fashion.',
      status: 'APPROVED' as const,
    },
    {
      email: 'aria@elitemaison.com',
      name: 'Aria Chen',
      location: 'New York, USA',
      height: "5'10\"",
      measurements: '34-25-35',
      eyeColor: 'Brown',
      hairColor: 'Black',
      bio: 'Aria Chen bridges Eastern and Western aesthetics, making her the face of global luxury campaigns.',
      status: 'APPROVED' as const,
    },
    {
      email: 'sofia@elitemaison.com',
      name: 'Sofia Laurent',
      location: 'Paris, France',
      height: "5'9\"",
      measurements: '33-24-34',
      eyeColor: 'Brown',
      hairColor: 'Blonde',
      bio: 'Sofia brings a classic French elegance to every project.',
      status: 'PENDING' as const,
    },
  ]

  for (const model of models) {
    const password = await bcrypt.hash('model123456', 12)
    const user = await prisma.user.upsert({
      where: { email: model.email },
      update: {},
      create: {
        email: model.email,
        password,
        name: model.name,
        role: 'MODEL',
        modelProfile: {
          create: {
            status: model.status,
            bio: model.bio,
            location: model.location,
            height: model.height,
            measurements: model.measurements,
            eyeColor: model.eyeColor,
            hairColor: model.hairColor,
          },
        },
      },
    })
    console.log(`✅ Model created: ${user.email}`)
  }

  // Seed editorial stories
  const stories = [
    { title: 'The Monochrome Issue', category: 'Campaign', excerpt: 'Exploring texture and form without the distraction of color in our latest Paris exclusive.', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800', slug: 'monochrome-issue' },
    { title: 'Architectural Forms', category: 'Editorial', excerpt: 'How structured garments are redefining silhouettes for the upcoming season.', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', slug: 'architectural-forms' },
    { title: 'Nordic Solitude', category: 'Location', excerpt: 'Shooting the Winter collection against the austere landscapes of Iceland.', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800', slug: 'nordic-solitude' },
  ]

  for (const story of stories) {
    await prisma.editorialStory.upsert({
      where: { slug: story.slug },
      update: {},
      create: story,
    })
  }
  console.log('✅ Stories seeded')

  // Seed sample application
  await prisma.application.create({
    data: {
      name: 'Sophie Williams',
      email: 'sophie@example.com',
      phone: '+44 7700 900000',
      age: '22',
      height: "5'9\"",
      location: 'London, UK',
      message: 'I have been modeling locally for 3 years and would love the opportunity to work with Elite Maison.',
      status: 'PENDING',
    },
  }).catch(() => {}) // ignore if already exists
  console.log('✅ Sample application seeded')

  console.log('\n🎉 Seeding complete!')
  console.log('\n📋 Login credentials:')
  console.log('  Admin: admin@elitemaison.com / admin123456')
  console.log('  Model: elena@elitemaison.com / model123456')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
