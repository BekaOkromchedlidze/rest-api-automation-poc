// my-test.ts
import { APIRequestContext, test as base } from '@playwright/test'
import authenticatedApiRequest from './api-context'

// Declare the types of your fixtures.
type Fixtures = {
  authenticatedApiRequest: APIRequestContext
}

// This new context can be used in multiple test files, and each of them will get the fixtures.
const test = base.extend<Fixtures>({
  // eslint-disable-next-line no-empty-pattern
  authenticatedApiRequest,
})

export default test
