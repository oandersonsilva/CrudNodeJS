const Sequelize = require('sequelize')
const connection = require('./database')

const modelCProdutos = connection.define('Produtos', {
  descricao: {
    type: Sequelize.TEXT,
    allowNULL: false
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNULL: false
  }
})

modelCProdutos
  .sync({ force: false })
  .then(console.log('tabela de produtos Criada'))

module.exports = modelCProdutos
