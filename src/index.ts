import { type Message } from "./types"

export { Message }

export const sendEmail = async (
  message: Message,
  options: { token: string }
) => {
  const res = await fetch(`https://email-api.egoist.workers.dev/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify(message),
  })

  if (!res.ok) {
    const data = (await res.json()) as any
    return { error: data.error }
  }

  return { data: {} }
}
