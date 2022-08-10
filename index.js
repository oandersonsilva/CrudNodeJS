const express = require('express')
const app = express()
const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes raves do form e os transforma em objeto JS dentro do Req.body
const Sequelize = require('sequelize')
const connection = require('./database/database')
const model = require('./database/model1')
const model2 = require('./database/model2')
const { raw } = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) //evita que utilizem campos encadeados
app.use(bodyParser.json())

port = 3000
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cadastro', (req, res) => {
  res.render('cadastro')
})

app.get('/consulta', (req, res) => {
  var varId = '2'

  model.findOne({ where: { id: varId } }).then(item => {
    if (item != undefined) {
      console.log(item.dataValues.nome)
      res.render('consulta', { variavel: item })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/pessoaCadastrada', (req, res) => {
  var nome = req.body.Inome
  var sobrenome = req.body.Isobrenome
  var email = req.body.Iemail
  var data = req.body.Idata
  var telefone = req.body.Iphone
  var estado = req.body.Istate
  var username = req.body.Iusername
  var senha = req.body.Ipassword

  console.log('Cadastro efetuado com sucesso')
  model.create({
    nome: nome,
    email: email,
    sobrenome: sobrenome,
    data: data,
    telefone: telefone,
    estado: estado,
    username: username,
    senha: senha
  })
  res.send(nome)
})

app.listen(port)

console.log('app Rodando')
