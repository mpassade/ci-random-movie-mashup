const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
    movies, random, home, logout, register, choose
} = require('../controllers/thirdPartyController.js')
const {
    loginCheck, validateLogInput, validateRegInput, regCheck, loginValidate
} = require('../middleware/middleware.js')

router.get('/movies', movies)
router.get('/random', random)
router.get('/home', home)
router.post(
    '/login',
    validateLogInput,
    loginCheck,
    passport.authenticate('local-login', {
        successRedirect: '/api/v1/ejspassport/choose-api',
        failureRedirect: '/api/v1/ejspassport/home',
        failureFlash: true
    }))
router.post(
    '/register',
    validateRegInput,
    regCheck,
    loginValidate,
    register)
router.get('/choose-api', choose)
router.get('/logout', logout)

module.exports = router