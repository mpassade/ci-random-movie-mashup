const User = require('../models/user.js')
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
}