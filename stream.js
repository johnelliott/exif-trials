const debug = require('debug')('trial:stream')
const fs = require('fs')
const jpegPath = 'img.jpg'
const str = fs.createReadStream(jpegPath)
let start

const jpeg = require('jpeg-marker-stream')

function getDateTimeOriginal (path = jpegPath, cb) {
  start = new Date()
  const thing = str.pipe(jpeg()).on('data', getDateTimeOriginalTag)

  function getDateTimeOriginalTag (data) {
    if (data.exif && data.exif.DateTimeOriginal) {
      debug(data.exif.DateTimeOriginal)
      cb(null, data.exif.DateTimeOriginal)
      thing.removeListener('data', result => debug('removed listener', result))
    }
  }
}

module.exports = getDateTimeOriginal

if (require.main === module) {
  getDateTimeOriginal(jpegPath, (err, result) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    debug(new Date() - start)
    console.log(result)
  })
}
