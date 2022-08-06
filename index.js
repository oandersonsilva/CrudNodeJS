const express = require('express')
const app = express()
const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes raves do form e os transforma em objeto JS dentro do Req.body
const Sequelize = require('sequelize')
const connection = require('./database/database')
const model = require('./database/model1')

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

app.post('/pessoaCadastrada', (req, res) => {
  var nome = req.body.Inome
  var email = req.body.Iemail
  console.log('Cadastro efetuado com sucesso')
  model.create({
    nome: nome,
    email: email
  })
  res.send(nome)
})

app.listen(port)

console.log('app Rodando')
