const express = require('express')
const router = express.Router()

const Login = require('./Login')
const Category = require('../Categories/Category')

const bcrypt = require('bcrypt')


router.get('/login', (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('login/login', {categories: categories})
    })
    
})

router.post('/login/acess', (req, res) =>{
    var email = req.body.email
    var password = req.body.password

    Login.findOne({where: {
        email: email
    }}).then((emailCad) =>{
        if(emailCad){
            var pass = bcrypt.compareSync(password, emailCad.password )
            if(pass){
                req.session.user = {
                    id: emailCad.id,
                    email: emailCad.email
                }
                res.redirect('/articles')
            }else{
                res.send('Senha incorreta')
            }
        }else{
            res.redirect('/login')
        }
    })
})

module.exports = router