const Sequelize = require('sequelize')
const connect = require('../../database/config')

const Category = connect.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})



module.exports = Category