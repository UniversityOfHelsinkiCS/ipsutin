import { z } from 'zod'

export const ShareResultsZod = z.object({
  emails: z.array(z.string().email()),
})

export type ShareResultEmails = z.infer<typeof ShareResultsZod>
