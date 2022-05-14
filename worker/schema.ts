import { z } from "zod"

export const inputSchema = z.object({
  to: z.array(z.object({ name: z.string(), email: z.string() })),
  from: z.object({
    name: z.string(),
    email: z.string(),
  }),
  subject: z.string(),
  content: z.string(),
  data: z.array(z.record(z.string(), z.any())).default([]),
})

export type InputType = z.infer<typeof inputSchema>
