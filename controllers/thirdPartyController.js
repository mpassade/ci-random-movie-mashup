const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')


module.exports = {
    validateLogInput: (req, res, next) => {
        const {email, password} = req.body
        if (!email || !password){
        req.flash('errors', 'All fields are required')
        return res.redirect('/api/v1/ejspassport/home')
        }
        next()
    },
    
    validateRegInput: (req, res, next) => {
        const {name, email, password} = req.body
        if (!name || !email || !password){
        req.flash('errors', 'All fields are required')
        return res.redirect('/api/v1/ejspassport/home')
        }
        next()
    },
    
    regCheck: [
        check('email').isEmail(),
        check('password').isLength({min:3})
    ],

    loginCheck: (req, res, next) => {
        User.findOne({email: req.body.email})
        .then(user => {
            if (!user){
                req.flash('errors', "Account doesn't exist")
                return res.redirect('/api/v1/ejspassport/home')
            }
            next()
        }).catch(() => {
            return res.status(400).send('Server Error')
        })
    },
    
    loginValidate: (req, res, next) => {
        const info = validationResult(req)
        if (!info.isEmpty()){
            req.flash('errors', 'Invalid Email or Password')
            return res.redirect('/api/v1/ejspassport/home')
        }
        next()
    },

    random: (req, res) => {
        const url = 'https://randomuser.me/api/?results=20'
        const fetch = require('node-fetch')
        fetch(url)
        .then(val => {
            return val.json()
        }).then(val => {
            const users = val.results
            users.sort((a,b) => {
                return a.name.last < b.name.last ? -1 : 1
            })
            res.render('main/random', {users})
        })
    },

    movies: (req, res) => {
        const apiKey = process.env.MOVIES_API_KEY
        const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey
        const posterBasePath = 'https://image.tmdb.org/t/p/w200'
        const fetch = require('node-fetch')
        fetch(url)
        .then(val => {
            return val.json()
        }).then(val => {
            const movies = val.results
            res.render('main/movies', {movies, posterBasePath})
        })
    },

    home: (req, res) => {
        console.log(req.user)
        res.render('main/home')
    },

    register: (req, res) => {
        User.findOne({email: req.body.email})
        .then(user => {
            if (user){
                req.flash('errors', 'Account already exists')
                return res.redirect('/api/v1/ejspassport/home')
            }
            const newUser = new User()
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)

            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = hash

            newUser.save().then(user => {
                req.login(user, (err) => {
                    if (err){
                        return res.status(400).send('Server Error')
                    }
                    return res.redirect('/api/v1/ejspassport/choose-api')
                })
            }).catch(() => {
                return res.status(400).send('Server Error')
            })
        }).catch(() => {
            return res.status(400).send('Server Error')
        })
        
    },

    choose: (req, res,) => {
        
        res.render('main/choose-api')
    }
}