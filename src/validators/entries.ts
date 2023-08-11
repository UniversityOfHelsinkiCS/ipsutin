import { z } from 'zod'

export const NewEntryZod = z.object({
  sessionToken: z.string().nonempty(),
  data: z.record(z.string().nonempty()),
})

export type NewEntry = z.infer<typeof NewEntryZod>
