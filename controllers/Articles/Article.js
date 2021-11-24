const Sequelize = require('sequelize')
const connect = require('../../database/config')

const Category = require('../Categories/Category')

const Article = connect.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        type: Sequelize.TEXT
    },
    categoryId: {
        type: Sequelize.INTEGER
    }
})



Article.belongsTo(Category)
Category.hasMany(Article)

module.exports = Article