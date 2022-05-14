export type Message = {
  from: { email: string; name: string }
  to: { email: string; name: string }[]
  data?: { [key: string]: any }[]
  subject: string
  content: string
}
