const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const passport = require('passport')
const uuid = require('uuid')
const session = require('express-session')
const flash = require('express-flash')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const cors = require('cors')
const methodOverride = require('method-override')

// google authentication
// const googleAuth = require('./config/google-config')
// googleAuth(passport)

// passport configuration
const passportConfig = require('./config/passport-config')
passportConfig(passport)

// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
)
// flash middleware
app.use(flash())
// passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
// view engine
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access')

app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
)
app.set('view engine', 'handlebars')
app.set('views', './views')
// app.use(express.static('/images'))

// method override
app.use(methodOverride('_method'))

// routes
app.use('/', require('./routes/login/loginRoutes'))

// googleAuth route
// app.use('/auth', require('./routes/login/googleAuthRoute'))

// api
app.use('/api/members', require('./routes/api/MemberRoutes'))

// image upload locally
// app.use('/imageupload', require('./routes/image_upload/ImageUpload'))

// image upload to mongodb
// app.use('/mongouploads', require('./routes/mongo_uploads/MongoUploads'))

mongoose.connect(
  'mongodb+srv://zubair:zubair@cluster0.oe4wp.mongodb.net/UsersDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err
    console.log('Connected with db')
  }
)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server started at port ${port}`))
