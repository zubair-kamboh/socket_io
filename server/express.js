// const express = require('express')
// const path = require('path')
// const app = express()
// var exphbs = require('express-handlebars')
// const mongoose = require('mongoose')
// const ApiModel = require('./schema')

// // body parser
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello world</h1>')
// // })

// mongoose.connect(
//   'mongodb+srv://zubair:zubair@cluster0.oe4wp.mongodb.net/MembersDB?retryWrites=true&w=majority',
//   () => {
//     console.log('connected with mongodb')
//   }
// )

// let hbs = exphbs.create({})
// app.engine('handlebars', hbs.engine)
// app.set('view engine', 'handlebars')

// // api routes
// app.use('/api/members', require('./routes/api/MemberRoutes'))

// app.get('/', (req, res) => {
//   ApiModel.find({})
//     .lean()
//     .exec((err, members) => {
//       res.render('home', { members })
//     })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`server start at port: ${PORT}`))
