import { z } from 'zod'

export const UserUpdatesZod = z.object({
  preferredFaculty: z.string(),
})

export type UserUpdates = z.infer<typeof UserUpdatesZod>
