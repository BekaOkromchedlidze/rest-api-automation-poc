// my-test.ts
import { APIRequestContext, request } from '@playwright/test'

const authenticatedApiRequest = async (
  // eslint-disable-next-line no-empty-pattern
  {}: any,
  // eslint-disable-next-line no-unused-vars
  use: (arg0: APIRequestContext) => any
) => {
  const encode = (str: string) => Buffer.from(str).toString('base64')
  const credentialsBase64 = encode(
    `${process.env.ENV_USERNAME}:${process.env.ENV_PASSWORD}`
  )

  // Set up the fixture.
  const context = await request.newContext({
    baseURL: process.env.ENV_BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Basic ${credentialsBase64}`,
    },
  })

  // Use the fixture value in the test.
  await use(context)
}

export default authenticatedApiRequest
