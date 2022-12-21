import { expect } from '@playwright/test'
import test from '../src/fixtures/fixtures'
import {
  validateHeaders,
  validateJsonSchema,
  validateResponseStatusCode,
} from '../src/test-actions/api-actions'

test.describe('/booking - GET', () => {
  test.describe('Positive Tests', () => {
    test('Execute API call with valid required parameters', async ({
      request,
    }) => {
      const jsonSchema = {
        type: 'array',
        default: [],
        title: 'Root Schema',
        items: {
          type: 'object',
          title: 'A Schema',
          required: ['bookingid'],
          properties: {
            bookingid: {
              type: 'integer',
              title: 'The bookingid Schema',
              examples: [3271, 354, 1266, 3103, 1681, 2200],
            },
          },
          examples: [
            {
              bookingid: 3271,
            },
            {
              bookingid: 354,
            },
            {
              bookingid: 1266,
            },
            {
              bookingid: 3103,
            },
            {
              bookingid: 1681,
            },
            {
              bookingid: 2200,
            },
          ],
        },
        examples: [
          [
            {
              bookingid: 3271,
            },
            {
              bookingid: 354,
            },
            {
              bookingid: 1266,
            },
            {
              bookingid: 3103,
            },
            {
              bookingid: 1681,
            },
            {
              bookingid: 2200,
            },
          ],
        ],
      }

      const response = await request.get('/booking', {
        headers: {
          'content-type': 'application/json',
        },
      })

      validateResponseStatusCode(response, 200)
      validateHeaders(response, {
        'content-type': 'application/json; charset=utf-8',
      })
      validateJsonSchema(response, jsonSchema)
    })
  })
  test.describe('Negative Tests with invalid input', () => {
    test('Execute API call with invalid values in HTTP headers', async ({
      request,
    }) => {
      let response = await request.get('/booking', {
        headers: {
          Accept: 'invalid',
        },
      })
      expect.soft(response).not.toBeOK()

      response = await request.get('/booking', {
        headers: {
          'content-type': 'invalid',
        },
      })
      expect.soft(response).not.toBeOK()
    })
  })
})
