const sequelize = require('sequelize')
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const Login = require('../login/Login')
const Category = require('../Categories/Category')

router.get('/register', (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('register/register', {categories: categories})
    })
    
})

router.post('/register/create', (req, res) =>{
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

     //Adcionar mais segurança ao hash
     var salt = bcrypt.genSaltSync(10)
     var hash = bcrypt.hashSync(password, salt)

    //Verificar se há um email cadastrado no banco
    Login.findOne({
        where: {
            email: email
        }
    }).then(emailCad =>{
       if(emailCad == null){
        Login.create({
            name: name,
            email: email,
            password: hash
        }).then(() =>{
            res.redirect('/')
        }).catch((err) =>{
            res.redirect('/')
        })
       }else{
        res.redirect('/register')
       }
    })

    
    
})

module.exports = router