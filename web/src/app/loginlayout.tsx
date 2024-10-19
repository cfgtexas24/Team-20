"use client"; // This is a client component

import { ClerkProvider } from '@clerk/clerk-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {children}
    </ClerkProvider>
  )
}
