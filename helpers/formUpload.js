/* eslint-disable n/no-callback-literal */
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`)
  }
})

const formUpload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const extFile = path.extname(file.originalname)
    if (extFile !== '.png' && extFile !== '.jpeg' && extFile !== '.jpg') {
      callback('Only images!', false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1048576 * 10 // 10mb
  }
})

module.exports = formUpload
