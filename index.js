const express = require('express')
const app = express()
const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes raves do form e os transforma em objeto JS dentro do Req.body
const modelCPessoas = require('./database/modelCPessoas')
const modelCProdutos = require('./database/modelCProdutos')
const { raw } = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false })) //evita que utilizem campos encadeados
app.use(bodyParser.json())

port = 3000
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cadastroPessoas', (req, res) => {
  res.render('cadastroPessoas')
})

app.get('/cadastroProdutos', (req, res) => {
  res.render('cadastroProdutos')
})

app.get('/consultaProdutos', (req, res) => {
  var id = '2'
  modelCProdutos.findAll({ raw: true }).then(item => {
    console.log(item)
    res.render('consultaProdutos', {
      item: item
    })
  })
})

app.get('/consultaPessoas', (req, res) => {
  var varId = '2'

  modelCPessoas.findOne({ where: { id: varId } }).then(item => {
    if (item != undefined) {
      console.log(item.dataValues.nome)
      res.render('consultaPessoas', { variavel: item })
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
  modelCPessoas.create({
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

app.post('/cadastroProdutos', (req, res) => {
  const descricao = req.body.Idescricao
  const valor = req.body.Ivalor
  modelCProdutos.create({
    descricao: descricao,
    valor: valor
  })
  console.log('cadastrado com sucesso')
  res.redirect('/')
})

app.listen(port)

console.log('app Rodando')
