const fetch = require('node-fetch')
const aobj = require('aobj')
const { DateTime } = require('luxon')

function chunkArray(array, size) {
  const chunked_arr = []
  let copied = [...array]
  const numOfChild = Math.ceil(copied.length / size)
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size))
  }
  return chunked_arr
}

const excelGeneratorWrapper = {
  async start(headers = []) {
    const response = await fetch(
      process.env.WHIZ_FILE_API_URL + '/api/generate/start',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          meta: {
            headers: headers,
            format: 'xls',
          },
          project_uuid: 'tudoc',
        }),
      },
    )
    const result = await response.json()
    return result
  },
  async upload(data, file_uuid) {
    const response = await fetch(
      process.env.WHIZ_FILE_API_URL + '/api/generate/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          file_uuid: file_uuid,
          data: data,
        }),
      },
    )
    const result = await response.json()
    return result
  },
  async stop(file_uuid) {
    const response = await fetch(
      process.env.WHIZ_FILE_API_URL + '/api/generate/stop',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          file_uuid: file_uuid,
        }),
      },
    )
    const result = await response.json()
    return result
  },
}

async function generateExcelDownload(headers, data) {
  const { start, upload, stop } = excelGeneratorWrapper

  const startProcess = await start(headers)

  if (startProcess.status != true) {
    throw 'Couldnt start excel generation'
  }

  let file_uuid = startProcess.data.file_uuid

  data = data.map((v) => {
    v = aobj.mapValues(v, (value) => {
      if (value === undefined || value === null) {
        return ''
      }

      if (value instanceof Date) {
        value = DateTime.fromJSDate(value, {
          zone: 'America/Lima',
        }).toLocaleString(DateTime.DATETIME_SHORT)
      }

      return value
    })

    return v
  })

  let chunks = chunkArray(data, 90)

  for (const chunk of chunks) {
    const uploadProcess = await upload(chunk, file_uuid)

    if (uploadProcess.status != true) {
      throw 'Couldnt continue excel generation'
    }
  }

  let stopProcess = await stop(file_uuid)

  if (stopProcess.status != true) {
    throw 'Couldnt continue excel generation'
  }

  return {
    path: process.env.WHIZ_FILE_API_URL + stopProcess.data.path,
    format: stopProcess.data.format,
    size: stopProcess.data.size,
  }
}

module.exports = {
  generateExcelDownload,
}
