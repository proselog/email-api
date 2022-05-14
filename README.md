Email API for Proselog.

Not intended for use outside of Proselog, but it should work with any worker, without any configuration.

```ts
import { sendEmail } from "@proselog/email-api"

const { data, error } = await sendEmail(
  {
    from: { email: "from@your.com", name: "Your Name" },
    to: [{ email: "customer@customer.com", name: "Customer Name" }],
    content: `
  Hello %%to.name%%

  Use the following token to login: 

  %%token%%
  `,
    data: [{ token: "SOME_TOKEN" }],
  },
  {
    // The token that matches API_TOKEN in your cloudflare worker secrets
    token: "API_TOKEN",
  }
)
```
