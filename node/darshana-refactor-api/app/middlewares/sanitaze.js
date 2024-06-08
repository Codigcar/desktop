const sanitizeHtml = require('sanitize-html')
const aobj = require('aobj')

let preventxss = (
  options = { sanitaze: { allowedTags: [], allowedAttributes: {} } },
) => {
  return (req, res, next) => {
    req.body = aobj.traverseValues(req.body, (value) => {
      if (typeof value !== 'string') {
        return value
      }

      return sanitizeHtml(value, options.sanitaze)
    })
    next()
  }
}

module.exports = {
  preventxss,
}
