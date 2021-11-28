const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')
const Grid = require('gridfs-stream')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const path = require('path')

const uri =
  'mongodb+srv://zubair:zubair@cluster0.oe4wp.mongodb.net/Uploads?retryWrites=true&w=majority'

// init gfs
let gfs

// connection
const conn = mongoose.createConnection(uri)
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

// create storage & uploads
var storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        }
        resolve(fileInfo)
      })
    })
  },
})
const upload = multer({ storage })

router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.json({ msg: 'No Files exists' })
    }

    res.render('mongouploads', { files })
  })
})

router.post('/', upload.single('image'), (req, res) => {
  res.redirect('/mongouploads')
})

router.get('/images', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === '') {
      return res.json({ msg: 'No Files exists' })
    }

    res.json(files)
  })
})

// read single file
router.get('/images/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // file not exist
    if (!file || file.length === 0) {
      return res.json({ err: 'No Files exists' })
    }

    // file exist
    if (
      file.contentType === 'image/jpg' ||
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/png'
    ) {
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({ msg: 'only images' })
    }
  })
})

router.delete('/deleteimg/:filename', (req, res) => {
  gfs.remove(
    { filename: req.params.filename, root: 'uploads' },
    (err, gridStore) => {
      if (err) return handleError(err)
      res.redirect('/mongouploads')
    }
  )
})

module.exports = router
