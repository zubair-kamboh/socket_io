// os
const os = require('os')
const path = require('path')
const fs = require('fs')
const http = require('http')

// console.log(toyota.age())

// console.log(__filename, __dirname)

// fs module
// fs.mkdir(path.join(__dirname, 'test'), {}, (err) => {
//   if (err) throw err
//   console.log('folder created...')
// })

// fs.writeFile(path.join(__dirname, 'test', 'test.txt'), 'Hello ', {}, (err) => {
//   if (err) throw err
//   console.log('writen to file')

//   fs.appendFile(
//     path.join(__dirname, 'test', 'test.txt'),
//     'Zubair!!! ',
//     {},
//     (err) => {
//       if (err) throw err
//       console.log('writen to file')
//     }
//   )
// })

// fs.readFile(path.join(__dirname, 'test', 'test.txt'), 'utf-8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// fs.rename(
//   path.join(__dirname, 'test', 'test.txt'),
//   path.join(__dirname, 'test', 'test2.txt'),
//   (err) => {
//     if (err) throw err
//     console.log('renamed file...')
//   }
// )

// event module
// const EventEmitter = require('events')

// // create class
// class MyEmitter extends EventEmitter {}

// // create object
// const myEmitter = new MyEmitter()

// // event listener
// myEmitter.on('logger', () => console.log('logger called'))

// // emit
// myEmitter.emit('logger')

// const Logger = require('./logger.js')

// // create object
// const myLogger = new Logger()
// // event listener
// myLogger.on('message', (data) => {
//   fs.appendFile(
//     path.join(__dirname, 'logs', 'logs.txt'),
//     JSON.stringify(data),
//     (err) => {
//       if (err) throw err
//       console.log('log registered...')
//     }
//   )
// })

// myLogger.log('Nice Jobs!!')

// http module

// const server = http.createServer((req, res) => {
//   const filePath = path.join(
//     __dirname,
//     'public',
//     req.url === '/' ? 'home.html' : req.url
//   )

//   const extname = path.extname(filePath)
//   let contentType = 'text/html'
//   switch (extname) {
//     case '.json':
//       contentType = 'application/json'
//       break

//     case '.js':
//       contentType = 'text/js'
//       break

//     case '.css':
//       contentType = 'text/css'
//       break

//     case '.png':
//       contentType = 'image/png'
//       break

//     case '.jpg':
//       contentType = 'image/jpg'
//       break
//   }

//   fs.readFile(filePath, 'utf-8', (err, content) => {
//     if (err) {
//       if (err.code == 'ENOENT') {
//         fs.readFile(
//           path.join(__dirname, 'public', '404.html'),
//           (err, content) => {
//             if (err) throw err
//             res.writeHead(404, { 'Content-Type': 'text/html' })
//             res.end(content, 'utf-8')
//           }
//         )
//       } else {
//         res.writeHead(500)
//         res.end(`Server Error: ${err.code}`)
//       }
//     } else {
//       res.writeHead(200, { 'Content-Type': contentType })
//       res.end(content)
//     }
//   })
// })
// const server = http.createServer((req, res) => {
//   if (req.url == '/') {
//     switch (req.url) {
//       case '.css':
//         break

//       default:
//         break
//     }
//     fs.readFile(
//       path.join(__dirname, 'public', 'home.html'),
//       'utf-8',
//       (err, content) => {
//         if (err) throw err
//         res.writeHead(200, { 'Content-Type': 'text/html' })
//         res.end(content)
//       }
//     )

// fs.readFile(
//   path.join(__dirname, 'public', 'index.css'),
//   'utf-8',
//   (err, content) => {
//     if (err) throw err
//     res.writeHead(200, { 'Content-Type': 'text/css' })
//     res.end()
//   }
// )
//   }
// })

// const PORT = process.env.PORT || 8000

// server.listen(8000, () => console.log(`server running on port ${PORT}`))
