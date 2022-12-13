/* eslint-disable global-require */
const { chromium, expect } = require('@playwright/test')
const { LoginPage } = require('./page-objects/LoginPage')

async function saveLoginState(username, password, path) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(process.env.ENV_BASE_URL)

  const loginPage = new LoginPage(page)
  await loginPage.login(username, password)
  await expect(page).toHaveURL(`${process.env.ENV_BASE_URL}/#/app`)
  await page.context().storageState({ path })
  await browser.close()
}

module.exports = async () => {
  if (typeof process.env.ENV === 'undefined') {
    process.env.ENV = 'regression' // If environment variable is not defined > default to regression environment
  }
  // process.env.SYSTEM = 'skips' // For testing purposes during test development

  // Configure ENV variables
  if (process.env.ENV) {
    require('dotenv').config({
      path: `${__dirname}/.env.${process.env.ENV}.${
        process.env.SYSTEM || 'transport'
      }`,
    })
  } else {
    require('dotenv').config()
  }

  // Log in to MOVE env and cache cookies
  await saveLoginState(
    process.env.SYSTEM_USERNAME,
    process.env.SYSTEM_PASSWORD,
    'login-state.json'
  )
}
