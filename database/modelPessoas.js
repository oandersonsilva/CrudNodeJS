const Sequelize = require('sequelize')
const connection = require('./database')

const modelPessoas = connection.define('Pessoas', {
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

modelPessoas
  .sync({ force: false })
  .then(console.log('tabela de pessoas Criada'))


function Pessoas(){
  this._num = '123'
  this._model = modelPessoas

}

Pessoas.prototype.cadastro = function(pessoa, callback){
  // cadastro na tabela
  _model.create({
    nome: pessoa.nome,
    email: pessoa.email,
    sobrenome: pessoa.sobrenome,
    data: pessoa.data,
    telefone: pessoa.telefone,
    estado: pessoa.estado,
    username: pessoa.username,
    senha: pessoa.senha
  })

  callback()
}

Pessoas.prototype.getAll = function(){
  console.log('pesquisei')
  _model
            .findAll({raw: true})
            .then(item => {
                if (item != undefined) {
                    res.render('../views/pessoas/consulta', {
                        variavel: item,
                        UsernamePag: username
                    })
                } else {
                    res.redirect('../')
                }
            })


}



module.exports = function(){
  return Pessoas;
} 

