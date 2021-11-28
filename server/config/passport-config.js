// stragy configuration
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../model/UserSchema')
const bcrypt = require('bcrypt')

const passportInitialize = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) throw err

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }

        // Load hash from your password DB.
        bcrypt.compare(
          password,
          user.password,
          (err, authenticatedPassword) => {
            // result == true
            if (err) throw err
            if (!authenticatedPassword) {
              return done(null, false, {
                message: 'Incorrect password.',
              })
            }

            return done(null, user)
          }
        )
      })
    })
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = passportInitialize
