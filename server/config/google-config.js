const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/UserGoogleSchema')
// const findOrCreate = require('mongoose-findorcreate')

// client ID & client Secret
const clientID =
  '461244708187-ubev6rnl72m5jaorgjdt0q2jargoqu92.apps.googleusercontent.com'

const clientSecret = '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'

const googleAuth = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        let newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value && profile.photos[0].value,
          email: profile.emails[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            return cb(null, user)
          } else {
            user = await User.create(newUser)
            return cb(null, user)
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => console.log(err))
  })
}

module.exports = googleAuth
