const express = require('express')
const router = express.Router()
const UserModel = require('../../model/UserSchema')
const passport = require('passport')
const bcrypt = require('bcrypt')

// Secure routes
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboared')
  }
  return next()
}

// Routes
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('register')
})

// register a user
router.post('/', (req, res) => {
  const { username, email, password } = req.body

  // validation
  if (!username || !email || !password) {
    req.flash('errors', 'Please enter all fields')
    res.render('register')
    return
  }

  UserModel.findOne({ email }, (err, userFound) => {
    if (userFound) {
      req.flash('errors', 'Already found a user with that email.')
      res.redirect('/')
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(password, salt, (err, hash) => {
          // Store hash in your password DB
          if (err) throw err
          const user = new UserModel({
            username,
            email,
            password: hash,
          })

          user
            .save()
            .then((user) => console.log(user))
            .catch((err) => {
              console.log(err)
              return
            })

          req.flash('registered', 'You are registered. Please login.')
          res.redirect('login')
        })
      })
    }
  })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboared',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

router.get('/dashboared', checkAuthenticated, (req, res) => {
  console.log(req.user)
  res.render('dashboared', {
    user: req.user,
  })

  // UserModel.findById(req.user.id, (err, userObject) => {
  //   if (err) throw err
  //   return userObject
  // })
  //   .lean()
  //   .exec((err, newUser) => {
  //     res.render('dashboared', {  })
  //   })
})

router.post('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router
