const debug = require('debug')('trial:exif')
const jpegPath = 'img.jpg'
let start

const ExifImage = require('exif').ExifImage

function getDateTimeOriginal (path = jpegPath, cb) {
  start = new Date()

  try {
    ExifImage({ image: path }, (error, exifData) => {
      if (error) {
        debug(error)
        cb(error)
      }
      cb(null, exifData.exif.DateTimeOriginal) // Do something with your data!
    })
  } catch (error) {
    debug('Error: ' + error.message)
    cb(error)
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
