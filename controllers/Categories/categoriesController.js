const express = require('express')
const router = express.Router()
const slugify = require('slugify')
const Category = require('./Category')

const adminAuth = require ('../../middlewares/adminAuth')


//LISTAR CATEGORIAS
router.get('/categories', adminAuth, (req, res) => {
    Category.findAll({raw: true}).then(listcat =>{
        res.render('categories/index', {
            listacategorias: listcat
        })
    })
    
})

router.get('/admin/categories', adminAuth, (req, res) => {
    res.render('categories/admin/admin')
})

router.post('/admin/categories/cadastrar', adminAuth, (req, res) =>{
    var nome_categoria = req.body.nome_categoria
    if(nome_categoria === ""){
        res.redirect('/admin/categories')
    }else{
        Category.create({
            title: nome_categoria,
            slug: slugify(nome_categoria, {lower: true})
        }).then(() => {
            res.redirect('/categories')
        })  
    }
    
    
})

//DELETING CATEGORY
router.post('/categories/delete', adminAuth, (req, res) =>{
    var id = req.body.id
    Category.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/categories')
    })
})

//EDITION CATEGORY
router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    var id = req.params.id
    Category.findByPk(id).then(category =>{
        if(category != undefined){
            res.render('categories/admin/editionCategory', {categories: category})
        }else{
            res.redirect('/categories')
        }
    }).catch(erro => {
        res.redirect('/categories')
    })
})

router.post('/admin/categories/update', adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title
    Category.update({title: title, slug: slugify(title, {lower: true})}, {
        where: {
            id: id
        }
    })
    res.redirect('/categories')
})

module.exports = router