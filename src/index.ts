import { type InputType } from "../worker/schema"

export type Message = InputType

export const sendEmail = async (
  input: InputType,
  options: { token: string }
) => {
  const res = await fetch(`https://email-api.egoist.workers.dev/`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const data = (await res.json()) as any
    return { error: data.error }
  }

  return { data: {} }
}
