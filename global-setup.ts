/* eslint-disable global-require */
// import { request } from '@playwright/test'

async function globalSetup() {
  // Configure ENV variables
  require('dotenv').config()
}

export default globalSetup
