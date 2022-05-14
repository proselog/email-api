import { type InputType } from "../worker/schema"

export const sendEmail = async (input: InputType) => {
  const res = await fetch(`https://email-api.egoist.workers.dev/`, {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const data = (await res.json()) as any
    return { error: data.error }
  }

  return { data: {} }
}
