const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

module.exports = {
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
        res.render('main/home')
    },

    login: (req, res) => {

    },

    register: (req, res) => {
        const {name, email, password} = req.body
        if (!name || !email || !password){        
            res.render('main/home', {error: 'All fields are required'})
        }
        // User.findOne({email: req.body.email})
        // .then(user => {
        //     if (user){
        //         return req.flash('errors', 'Account already exists')
        //     }
        //     const newUser = new User()
        //     const salt = bcrypt.genSaltSync(10)
        //     const hash = bcrypt.hashSync(req.body.password, salt)

        //     newUser.name = req.body.name
        //     newUser.email = req.body.email
        //     newUser.password = hash

        //     newUser.save().then(user => {
        //         req.login(user, (err) => {
        //             if (err){
        //                 return res.status(400).send('Error Logging In')
        //             }
        //             res.redirect('/api/v1/ejspassport/choose-api')
        //         })
        //     }).catch(() => {
        //         res.status(400).send('Error: User not Registered')
        //     })
        // }).catch(() => {
        //     res.status(400).send('Error determining if user already ')
        // })
        
    },

    choose: (req, res,) => {
        
        res.render('main/choose-api')
    }
}