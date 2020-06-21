const express = require('express')
const router = express.Router()
const {
    movies, random, home, login, register, choose
} = require('../controllers/thirdPartyController.js')

router.get('/movies', movies)
router.get('/random', random)
router.get('/home', home)
router.post('/login', login)
router.post('/register', register)
router.get('/choose-api', choose)

module.exports = router