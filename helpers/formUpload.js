const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    //verifikasi file .png / jpg and size max 1 mb
    cb(null, `${new Date().getTime()}-${file.originalname}`)
  }
})

const formUpload = multer({ storage: storage })

module.exports = formUpload