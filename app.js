const express = require('express')
const app = express()
const categoriesController = require('./controllers/Categories/categoriesController')
const articlesController = require('./controllers/Articles/articlesController')
const homeController = require('./controllers/home/homeController')
const loginController = require('./controllers/login/loginController')
const registerController = require('./controllers/register/registerController')

// DATABASE
const connection = require('./database/config')
connection.authenticate().then(()=> {
    console.log('Connected to the database')
}).catch((error) => {
    console.log('Database connection falied. Error' + error)
})


//SETING ALL SETTINGS EXPRESS
app.use(express.urlencoded({extended: true}))

//EXPRESS USE FILE STATIC
app.use(express.static('public'))

//VIEW ENGINE
app.set('view engine', 'ejs')

//CREATING ROUTE
app.use('/', categoriesController)

app.use('/', articlesController)

app.use('/', homeController)

app.use('/', loginController)

app.use('/', registerController)



//WORKING SERVER
app.listen(8085, () => {
    console.log('O servidor está rodando na porta: 8085');
})