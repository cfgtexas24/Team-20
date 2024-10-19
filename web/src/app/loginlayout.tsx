"use client"; // This is a client component

import { ClerkProvider } from '@clerk/clerk-react';
import { env } from '@/env.mjs'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  )
}
