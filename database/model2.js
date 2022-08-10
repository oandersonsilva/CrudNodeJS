const Sequelize = require('sequelize')
const connection = require('./database')

const model2 = connection.define('', {
  nome: {
    type: Sequelize.STRING,
    allowNULL: false
  }
})
