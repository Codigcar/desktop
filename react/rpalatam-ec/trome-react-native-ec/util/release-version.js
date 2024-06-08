/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const exec = require('child_process').exec
const proc = require('process')
const semanticRelease = require('semantic-release')

module.exports = async function releaseVersion() {
  try {
    const brand = process.env.APP_BRAND
    const platform = process.env.APP_PLATFORM
    const options = { cwd: proc.cwd() }

    const result = await semanticRelease({
      branches: [`${process.env.CI_COMMIT_REF_NAME}`],
      ci: false,
      dryRun: true,
      plugins: [
        [
          '@semantic-release/commit-analyzer',
          {
            preset: 'conventionalcommits',
          },
        ],
      ],
      tagFormat: '${version}' + `+${brand}.${platform}`,
    })

    if (!result) throw new Error('No release published.')

    const {
      nextRelease: { version },
    } = result

    if (platform === 'android') {
      exec(`echo ANDROID_VERSION_NAME=${version} >> build.env`, options)
    } else if (platform === 'ios') {
      exec(`echo IOS_VERSION_NUMBER=${version} >> build.env`, options)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
