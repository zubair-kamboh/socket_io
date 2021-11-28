const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

router.get('/', (req, res) => {
  res.render('imageupload')
})

// disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../..', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

//upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const filecheck = /png|jpg|jpeg|gif/
    const ext = filecheck.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filecheck.test(file.mimetype)

    console.log(file.originalname)
    if (ext || mimetype) {
      return cb(null, true)
    } else {
      return cb('Error: only images!!!')
    }
  },
}).single('myImage')

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('imageupload', {
        msg: err,
      })
    } else {
      if (req.file == undefined) {
        return res.render('imageupload', {
          msg: 'Please include a file before sumbit',
        })
      } else {
        console.log(req.file)
        res.render('imageupload', {
          msg: 'file uploaded',
          file: `/${req.file.filename}`,
        })
      }
    }
  })
})

module.exports = router
