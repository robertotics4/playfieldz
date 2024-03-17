import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/header'
import { AuthProvider } from '../providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playfieldz',
  description: 'Organize sua pelada!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="flex justify-center items-center">{children}</div>
        </body>
      </html>
    </AuthProvider>
  )
}
