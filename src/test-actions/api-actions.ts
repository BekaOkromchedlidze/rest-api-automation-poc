/* eslint-disable no-console */
import { APIResponse, expect } from '@playwright/test'
import JsonSchema from 'jsonschema'

/**
 * Given the response and expected status code, this function validates correct status code was received in the response
 *
 * @param {APIResponse} response API response
 * @param {(number | number[])} expectedStatusCode Expected status code in the reponse. This can be single or an array. In case of array, the validation will pass if the response status code is one of the objects within the array
 */
export function validateResponseStatusCode(
  response: APIResponse,
  expectedStatusCode: number | number[]
) {
  const isArray = Array.isArray(expectedStatusCode)

  if (isArray) {
    expect.soft(expectedStatusCode).toContain(response.status())
  } else {
    expect.soft(expectedStatusCode).toBe(response.status())
  }
}

/**
 * This function can be used for validating the response payload schema
 * Given the response and expected json-schema, this function validates response json to follow the json schema
 * @async
 * @param {APIResponse} response API response
 * @param {{ [k: string]: any }} schema Expected json schema
 */
export async function validateJsonSchema(
  response: APIResponse,
  schema: { [k: string]: any }
) {
  const validationResult = JsonSchema.validate(await response.json(), schema)

  // Validate the schema and print errors if assertion fails
  expect
    .soft(validationResult.valid, validationResult.errors.toString())
    .toBeTruthy()
}

/**
 * This function can be used for validating the payload and state.
 * Given the response with a json and expected json object, this function validates json content to be the same
 * @async
 * @param {APIResponse} response
 * @param {{ [k: string]: any }} json
 */
export async function validateJson(
  response: APIResponse,
  json: { [k: string]: any }
) {
  expect.soft(await response.json()).toEqual(json)
}

/**
 * Asserts that the response headers contains the expected header
 * @param {APIResponse} response
 * @param {{ [k: string]: any }} expectedHeaders
 */
export function validateHeaders(
  response: APIResponse,
  expectedHeaders: { [k: string]: any }
) {
  expect.soft(response).toHaveHeaders(expectedHeaders)
}
