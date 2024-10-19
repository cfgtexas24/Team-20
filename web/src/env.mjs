import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    YOUTUBE_API_KEY: z.string().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    STRING_64: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    NODE_ENV: z
      .enum(['development', 'test', 'production'], {
        description: 'This gets updated depending on your environment',
      })
      .default('development'),
    TWILIO_ACCOUNT_SID: z.string().min(1),
    TWILIO_AUTH_TOKEN: z.string().min(1),
    TWILIO_PHONE_NUMBER: z.string().min(1),
    STRING_64: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_AUTH_TOKEN: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_DYTE_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_DYTE_AUTH_TOKEN: z.string().min(1),
    NEXT_PUBLIC_PHONE_NUMBER: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXT_PUBLIC_DYTE_CLIENT_ID: process.env.NEXT_PUBLIC_DYTE_CLIENT_ID,
    NEXT_PUBLIC_DYTE_AUTH_TOKEN: process.env.NEXT_PUBLIC_DYTE_AUTH_TOKEN,
    STRING_64: process.env.STRING_64,
    NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
  },
})
