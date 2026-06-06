import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELITE MAISON — High Fashion Modeling Agency',
  description: 'Elite Maison is a premier modeling agency representing the world\'s most extraordinary talent. Discover our curated roster of top models from Paris, Milan, New York and beyond.',
  keywords: 'modeling agency, fashion models, luxury, editorial, haute couture, Elite Maison',
  openGraph: {
    title: 'ELITE MAISON — High Fashion Modeling Agency',
    description: 'Representing the world\'s most extraordinary talent.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
