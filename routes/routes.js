const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
    movies, random, home, login, register, choose, loginCheck,
    validateLogInput, validateRegInput, regCheck, loginValidate
} = require('../controllers/thirdPartyController.js')

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

module.exports = router