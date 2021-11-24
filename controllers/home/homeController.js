const express = require('express')
const router = express.Router()

const Articles = require('../Articles/Article')
const Category = require('../Categories/Category')

router.get('/', (req, res) =>{
    Articles.findAll({order: [['id', 'DESC']], limit: 4}).then(articles =>{
        Category.findAll({raw: true}).then(categories => {
            res.render('index', {articles: articles, categories: categories})
        })    
    })   
})

router.get('/articles/:slug', (req, res) =>{
    var slug = req.params.slug
    Articles.findOne({
        where: {
            slug: slug
        },
        include: [{model: Category}]
    }).then(listArticle =>{
        if(listArticle !== null){
            Category.findAll().then(categories => {
                res.render('article', {
                    listArticle: listArticle,
                    categories: categories
                })
            })
            
        }else{
            res.redirect('/')
        }
    })
})

//EXIBINDO CONTEÚDO POR CATEGORIA
router.get('/categoria/:slug', (req, res) =>{
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Articles}]
    }).then(categories =>{
        if(categories !== null){
            Category.findAll().then(category =>{
                res.render('index', {categories: category, articles: categories.articles} )
            })
        }else{

        }
    })
})

module.exports = router

