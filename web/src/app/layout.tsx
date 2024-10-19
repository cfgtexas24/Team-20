import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import Chatbot from '@/components/chatbot'

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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
            <div className='flex flex-col h-screen'>
              <div className='h-16 z-10 w-full mb-6'>
                <Navbar />
              </div>
              <div className='flex flex-col md:flex-row flex-1 w-full border-b border'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto w-full px-4 md:px-8 lg:px-20 mt-8'>
                  {children}
                  <Toaster />
                </main>
              </div>
            </div>
            <Chatbot />
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
