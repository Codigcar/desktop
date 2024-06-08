const fs = require('fs').promises
const path = require('path')
const stream = require('stream')

const alphanumeric = require('nanoid-dictionary/alphanumeric')
const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet(alphanumeric, 6)

const { typeErrorMessages } = require('../helpers/enums')

async function ensureFilesFolder() {
  try {
    await fs.readdir(path.join(process.cwd(), 'files'))
  } catch (error) {
    await fs.mkdir(path.join(process.cwd(), 'files'))
  }
}

async function getFileName(name) {
  await ensureFilesFolder()
  for (let i = 0; i < 10; i++) {
    let id = await nanoid()
    let f_name = id + '.' + name
    try {
      await fs.readFile(path.join(process.cwd(), 'files', f_name))
    } catch (error) {
      return f_name
    }
  }
  throw 'Couldnt generate file name'
}

async function getFile(id) {
  await ensureFilesFolder()
  let dir = await fs.readdir(path.join(process.cwd(), 'files'), {
    withFileTypes: true,
  })
  let file_name = dir.map((v) => v.name).find((f) => f.startsWith(id + '.'))
  if (!file_name) throw 'File not found'
  let file = await fs.readFile(path.join(process.cwd(), 'files', file_name))
  let original_file_name = file_name.split('.').slice(1).join('.')
  return { file, file_name: original_file_name }
}

async function storeFile(buffer, name) {
  await ensureFilesFolder()
  let f_name = await getFileName(name)
  await fs.writeFile(path.join(process.cwd(), 'files', f_name), buffer)
  return f_name
}

module.exports = {
  download: () => async (req, res) => {
    let file_id = req.params.file_id

    let { file, file_name } = await getFile(file_id)

    var readStream = new stream.PassThrough()
    readStream.end(file)

    res.set('Content-disposition', 'attachment; filename=' + file_name)

    readStream.pipe(res)
  },

  upload: () => async (req, res) => {
    try {
      let file_buffer = req.files[0].buffer
      let file_name = req.files[0].originalname

      let name = await storeFile(file_buffer, file_name)
      let id = name.split('.')[0]

      res.json({
        status: true,
        data: '/api/file/' + id,
      })
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: typeErrorMessages.CANT_UPLOAD_FILE,
        message_es: typeErrorMessages.CANT_UPLOAD_FILE_ES,
      })
    }
  },
}
