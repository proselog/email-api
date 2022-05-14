import { z } from "zod"

const ENDPOINT = "https://api.mailchannels.net/tx/v1/send"

const handler: ExportedHandler<{ API_TOKEN: string }> = {
  async fetch(request: Request, env): Promise<Response> {
    try {
      if (request.method !== "POST" && request.method !== "OPTIONS") {
        return new Response(`method now allowed`, { status: 405 })
      }

      const token = request.headers
        .get("authorization")
        ?.replace(/[Bb]earer\s/, "")
      if (token !== env.API_TOKEN) {
        return new Response(`invalid token`, { status: 401 })
      }

      const input = z
        .object({
          to: z.array(z.object({ name: z.string(), email: z.string() })),
          from: z.object({
            name: z.string(),
            email: z.string(),
          }),
          subject: z.string(),
          content: z.string(),
          data: z.array(z.record(z.string(), z.any())).default([]),
        })
        .parse(await request.json())

      const sendRequestBody = {
        from: input.from,
        subject: input.subject,
        personalizations: [
          {
            to: input.to,
          },
        ],
        content: input.to.map((to, index) => {
          const variables = input.data[index] || {}
          const html = input.content.replace(/%%([a-zA-Z0-9_]+)%%/g, (_, m) => {
            return variables[m] || ""
          })
          return {
            type: "text/html",
            value: html,
          }
        }),
      }
      const sendRequest = new Request(ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sendRequestBody),
      })

      const response = await fetch(sendRequest)
      const text = await response.text()
      // Check if request was successful
      if (!response.ok) {
        console.error(
          "[WorkerEmail] Failed to send email",
          response.status,
          text
        )
        throw new Error(`Failed to send email: ${response.status} ${text}`)
      }

      return new Response("sent")
    } catch (error: any) {
      return new Response(error.message, { status: 500 })
    }
  },
}

export default handler
