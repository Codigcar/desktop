import axios from 'axios'
import fs from 'fs/promises'

const APP_BUNDLE_ID = process.env.APP_IDENTIFIER
const APP_BRAND = process.env.SCHEMA
const APP_PLATFORM = process.env.PLATFORM
const CI_MERGE_REQUEST_IID = process.env.CI_MERGE_REQUEST_IID
const CI_PIPELINE_ID = process.env.CI_PIPELINE_ID
const CI_PROJECT_ID = process.env.CI_PROJECT_ID
const GITLAB_TOKEN = process.env.GITLAB_TOKEN

const lookup = await axios.get(
  `https://itunes.apple.com/lookup?bundleId=${APP_BUNDLE_ID}`,
)
const [{ fileSizeBytes }] = lookup.data.results

/**
 * This plist file is created when the app is exported as an
 * Ad Hoc, Development, or Enterprise build.
 *
 * @see https://developer.apple.com/documentation/xcode/reducing-your-app-s-size
 */
const data = await fs.readFile('ios/build/app-thinning.plist', {
  encoding: 'utf8',
})
const text = data.replace(/(\r\n|\n|\r|\s)/gm, '')
const appVariants = text.match(
  /<key>sizeUncompressedApp<\/key><integer>(\d+)<\/integer>/g,
)
const [lastVariant] = appVariants.reverse()
const [sizeUncompressedApp] = lastVariant.match(/\d+/)

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const diff = +sizeUncompressedApp - +fileSizeBytes
const plus = diff > 0
const appSize = formatBytes(sizeUncompressedApp)
const diffSize = formatBytes(Math.abs(diff))
const variationText = `${plus ? '+' : '-'}${diffSize} ${plus ? '🔺' : '🔽'}`

const instance = axios.create({
  baseURL: `https://gitlab.ec.pe/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}`,
  headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN },
})

const { data: notes } = await instance.get('/notes')
const note = notes.find((n) => n.body.includes(`[#${CI_PIPELINE_ID}]`))
const row = `| ${APP_BRAND} | ${APP_PLATFORM} | ${appSize} (${variationText}) |`

if (note) {
  await instance.put(`/notes/${note.id}`, { body: `${note.body}\n${row}` })
  console.log('Edited a note to request opened')
} else {
  const body = [
    `## App size report [#${CI_PIPELINE_ID}](https://gitlab.ec.pe/movil/trome/trome-react-native/pipelines/${CI_PIPELINE_ID})`,
    '| Name       | Platform | Size                   |',
    '| ---------- | -------- | ---------------------- |',
    row,
  ]
  await instance.post('/notes', { body: body.join('\n') })
  console.log('Opened a new note to merge request')
}
