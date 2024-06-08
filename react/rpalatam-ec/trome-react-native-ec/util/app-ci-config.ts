import { exec } from 'child_process'
import { cwd } from 'process'

import releaseVersion from './release-version'

async function main(): Promise<void> {
  const brand = process.env.APP_BRAND
  const options = { cwd: cwd() }
  const { default: config } = await import(`../app.${brand}.config`)
  const keys = Object.keys(config)
  keys.forEach((key) => {
    exec(`echo ${key}=${config[key]} >> build.env`, options)
  })
  await releaseVersion()
}

main()

export {}
