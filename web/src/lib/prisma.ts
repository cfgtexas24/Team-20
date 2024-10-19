import { env } from '@/env.mjs'
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()
if (env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
