const express = require('express')
const router = express.Router()

const Login = require('./Login')
const Category = require('../Categories/Category')

router.get('/login', (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('login/login', {categories: categories})
    })
    
})

module.exports = router