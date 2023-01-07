const connection = require('./database')
const sequelize = require('sequelize')

const modelUnidades = connection.define('Unidades', {
  local: {
    type: sequelize.STRING,
    allowNull: false
  },
  numeroFuncionarios: {
    type: sequelize.FLOAT,

    allowNull: true
  }
})

modelUnidades.sync({ force: false }).then(console.log('tabela unidade criada'))

module.exports = modelUnidades
