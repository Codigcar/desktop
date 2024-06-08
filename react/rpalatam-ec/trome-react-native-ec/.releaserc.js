module.exports = {
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
          ],
          issueUrlFormat: 'https://app.clickup.com/t/{{id}}',
        },
      },
    ],
    '@semantic-release/gitlab',
  ],
  tagFormat:
    '${version}' + `+${process.env.APP_BRAND}.${process.env.APP_PLATFORM}`,
}
