import './globals.css'

import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | Testlo shop',
    default: 'Home | Testlo shop',
  },
  description: 'A virtual shop for testing',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
      </body>
    </html>
  )
}
