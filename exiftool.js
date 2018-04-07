const debug = require('debug')('trial:exiftool')
const fs = require('fs')
const jpegPath = 'img.jpg'
let start

const exiftool = require('exiftool.js')

function getDateTimeOriginal (path = jpegPath, cb) {
  start = new Date()

  exiftool.getExifFromLocalFileUsingNodeFs(fs, jpegPath, (err, exif) => {
    if (err) {
      debug(err)
      cb(err)
    }
    cb(null, exif['DateTimeOriginal'])
  })
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
