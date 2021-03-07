const express = require('express')
const passport = require('passport')

const router = express.Router()
require('dotenv').config()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// http://localhost:3000/api/samples
router.get('/samples', (req, res, next) => {
  if (req) {
    return res.status(200).json({ data: req })
  } 
   const err = new Error('No samples found!')
   err.code = 401
  return next(err)
})

// http://localhost:3000/api/user/register
router.post('/register', (req, res, next) => {
  // We use passport to register users.
  passport.authenticate('register', (error, user) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(200).json({
      data: user,
    })
  })(req, res, next)
})

// http://localhost:3000/api/user/login
router.post('/login', (req, res, next) => {
  // We use passport to login.
  passport.authenticate('login', (error, user) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }
    req.logIn(user, () => res.status(200).json({ data: user }))
  })(req, res, next)
})

// http://localhost:3000/api/user/check-session
router.get('/check-session', (req, res, next) => {
  if (req.user) {
    return res.status(200).json({ data: req.user })
  } 
   const err = new Error('No user session found!')
   err.code = 401
  return next(err)
})
// http://localhost:3000/api/user/logout
router.get('/logout', (req, res) => {
  if (req.user) {
    // Delete sesion.
    req.logout()
    // Delete cookie.
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: err.message })
      }

      res.clearCookie('connect.sid')
      return res.status(200).json({ data: req.user })
    })
  } else {
    return res.status(200).json({ data: 'no session' })
  }
})

module.exports = router
