const Sequelize = require('sequelize')
const connection = require('./database')

const modelProdutos = connection.define('Produtos', {
  descricao: {
    type: Sequelize.TEXT,
    allowNULL: false
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNULL: false
  }
})

modelProdutos
  .sync({ force: false })
  .then(console.log('tabela de produtos Criada'))

module.exports = modelProdutos
