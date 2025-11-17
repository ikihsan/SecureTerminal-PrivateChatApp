import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import ConvexProviderWrapper from '../components/ConvexProviderWrapper'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secure Terminal - Private Messaging',
  description: 'A clandestine, terminal-based private messaging app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={jetbrainsMono.className}>
        <ConvexProviderWrapper>
          {children}
          <Analytics />
        </ConvexProviderWrapper>
      </body>
    </html>
  )
}