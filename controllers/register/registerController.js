const sequelize = require('sequelize')
const express = require('express')
const router = express.Router()

const Login = require('../login/Login')
const Category = require('../Categories/Category')

router.get('/register', (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('register/register', {categories: categories})
    })
    
})

module.exports = router