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

app.get('/pessoas/cadastro', (req, res) => {
  res.render('./pessoas/cadastro')
})

app.get('/produtos/cadastro', (req, res) => {
  res.render('./produtos/cadastro')
})

app.get('/produtos/consulta', (req, res) => {
  var item = []
  res.render('./produtos/consulta', { item: item })
})

app.post('/produtos/consulta', (req, res) => {
  var descricao = req.body.descricao
  modelCProdutos.findOne({ where: { descricao: descricao } }).then(item => {
    if (item != undefined) {
      res.render('./produtos/consulta', {
        item: item
      })
    }
  })
})

app.get('/produtos/consultaAll', (req, res) => {
  modelCProdutos.findAll({ raw: true, order: ['valor'] }).then(vetor => {
    res.render('./produtos/consultaAll', { item: vetor })
  })
})

app.get('/pessoas/consulta', (req, res) => {
  var varId = '1'

  modelCPessoas.findAll({ raw: true }).then(item => {
    if (item != undefined) {
      res.render('./pessoas/consulta', { variavel: item })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/deletarProdutos', (req, res) => {
  var id = req.body.id
  modelCProdutos.destroy({ where: { id: id } }).then(() => {
    res.redirect('/produtos/consultaAll')
  })
})

app.get('/produtos/editar/:id', (req, res) => {
  var id = req.params.id
  modelCProdutos.findOne({ where: { id: id } }).then(item => {
    res.render('./produtos/editar', { item: item })
  })
})

app.post('/updateProdutos', (req, res) => {
  var id = req.body.id
  var descricao = req.body.Idescricao
  var valor = req.body.Ivalor
  console.log(`${id}, ${descricao}, e ${valor} `)
  modelCProdutos
    .update(
      {
        descricao: descricao,
        valor: valor
      },
      {
        where: { id: id }
      }
    )
    .then(() => {
      res.redirect('/produtos/consultaAll')
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

app.post('/deletarPessoa', (req, res) => {
  var id = req.body.id
  modelCPessoas
    .destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.redirect('./pessoas/consulta')
    })
})

app.listen(port)

console.log('app Rodando')
