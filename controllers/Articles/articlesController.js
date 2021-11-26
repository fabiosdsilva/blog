const express = require('express')
const router = express.Router()
const slugify = require('slugify')
const Category = require('../Categories/Category')
const Articles = require('./Article')

const session = require('express-session')

const adminAuth = require('../../middlewares/adminAuth')

router.get('/articles', adminAuth, (req, res, next) => {
    Articles.findAll( {include: [{model: Category}]} ).then(listArticles =>{
        res.render('articles/index', {listArticles: listArticles})
    })
    
})

router.get('/admin/articles/new', adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('articles/admin/new', {categories: categories})
    })
    
})

router.post('/admin/articles/save', adminAuth, (req, res) => {
    var title = req.body.nome_artigo
    var body = req.body.text_artigo
    var categoryId = req.body.category
    Articles.create({
        title: title,
        slug: slugify(title, {lower: true}),
        body: body,
        categoryId: categoryId
    }).then(()=>{
        res.redirect('/articles')
    })
})

//DELETING ARTICLES
router.post('/admin/articles/delete', adminAuth, (req, res) =>{
    var id = req.body.id
    Articles.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/articles')
    })
})

router.get('/admin/articles/edit/:id', adminAuth, (req, res) =>{
    var id = req.params.id
    Articles.findOne({
        where: {
            id: id
        }
    }).then(articles => {
        res.render('articles/admin/editArticles', {
            articles: articles
        })
    })
})

//RECEBENDO EDIÇÃO NO BANCO DE DADOS
router.post('/admin/articles/edit/update', adminAuth, (req, res) =>{
    var id = req.body.idArticle
    var title = req.body.title_artigo
    var body = req.body.body_artigo
    Articles.update({
        title: title,
        body: body,
        slug: slugify(title, {lower: true})
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/articles')
    })
    
})

//PAGINAÇÃO
router.get('/articles/page/:num', adminAuth, (req, res) =>{
    var page = req.params.num
    var offset;
    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = (parseInt(page) -1) * 4
    }

    Articles.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles =>{
        var next;

        if((offset + 4) >= articles.count){
            next = false
        }else{
            next = true
        }

        var result = {next: next, articles: articles}
        
        Category.findAll().then(categories =>{
            res.render('pages', {result: result, categories: categories})
        })
    })
})


module.exports = router