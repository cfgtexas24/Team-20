import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import TheChatbot from '@/components/TheChatBot'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Storms Create',
  description: 'Storms Create Now!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <div
              className='flex flex-col h-screen overflow-hidden'
              style={{ background: '#F5F5DC' }}
            >
              <Navbar />
              <div className='flex flex-1 overflow-hidden'>
                <Sidebar />
                <main
                  className='flex-1 overflow-y-auto p-4 md:p-8 lg:p-20'
                  style={{ background: '#F5F5DC' }}
                >
                  {children}
                  <Toaster />
                </main>
              </div>
            </div>
            <TheChatbot />
          </SignedIn>
          <SignedOut>
            <div className='flex items-center justify-center w-screen h-screen'>
              <SignIn />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  )
}
