const Sequelize = require('sequelize')
const connection = require('./database')

const modelPrincipal = connection.define('principal', {
  nome: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNULL: false
  },
  sobrenome: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  data: {
    type: Sequelize.DATE,
    allowNULL: true
  },
  telefone: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  estado: {
    type: Sequelize.STRING,
    allowNULL: true
  },
  username: {
    type: Sequelize.STRING,
    allowNULL: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNULL: false
  }
})

modelPrincipal.sync({ force: false });
// .then(() => {
  console.log('tabela.criada')
// })

module.exports = modelPrincipal
