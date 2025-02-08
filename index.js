const express = require('express')
const app = express()
 const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes atraves do form e os transforma em objeto JS dentro do Req.body
 const modelCPessoas = require('./database/modelCPessoas')
 const modelCProdutos = require('./database/modelCProdutos')

const session = require('express-session')
const loginAuth = require('./middlewares/loginAuth')
const bcrypt = require('bcryptjs')
const modelUnidades = require('./database/modelUnidades')

app.use(bodyParser.urlencoded({ extended: false })) //evita que utilizem campos encadeados
app.use(bodyParser.json())
app.use(
  session({
    secret: 'asdga skdjaçsdjhaçsjhd',
    cookie: { maxAge: 3000000 }
  })
)



 port = 3000
// app.use(express.static('public'))
 app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }
  res.render('index', { UsernamePag: username })
})

app.get('/pessoas/cadastro',loginAuth, (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }
  res.render('./pessoas/cadastro', { UsernamePag: username })
})

app.get('/produtos/cadastro',  (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }
  res.render('./produtos/cadastro', { UsernamePag: username })
})

app.get('/produtos/consulta', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  var item = []
  res.render('./produtos/consulta', { item: item, UsernamePag: username })
})

app.post('/produtos/consulta', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  var descricao = req.body.descricao
  modelCProdutos.findOne({ where: { descricao: descricao } }).then(item => {
    if (item != undefined) {
      res.render('./produtos/consulta', {
        item: item,
        UsernamePag: username
      })
    } else {
    }
  })
})

//Sessão de login

app.get('/login', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }
  res.render('login', { UsernamePag: username })
})

app.post('/logando', (req, res) => {
  req.session.nome = req.body.Iusername
  res.redirect('/')
})

app.get('/logoff', (req, res) => {
  req.session.nome = undefined
  res.redirect('/login')
})

app.get('/produtos/consultaAll', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  modelCProdutos.findAll({ raw: true, order: ['valor'] }).then(vetor => {
    res.render('./produtos/consultaAll', { item: vetor, UsernamePag: username })
  })
})

// Consulta de Pessoas

app.get('/pessoas/consulta', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  var varId = '1'

  modelCPessoas.findAll({ raw: true }).then(item => {
    if (item != undefined) {
      res.render('./pessoas/consulta', {
        variavel: item,
        UsernamePag: username
      })
    } else {
      res.redirect('/')
    }
  })
})

app.post('/editarPessoa', (req, res) => {
  var id = req.body.id
  var nome = req.body.Inome
  var sobrenome = req.body.Isobrenome
  var data = req.body.Idata
  var telefone = req.body.Iphone
  var estado = req.body.Istate
  var username = req.body.Iusername

  modelCPessoas
    .update(
      {
        nome: nome,
        sobrenome: sobrenome,
        data: data,
        telefone: telefone,
        estado: estado,
        usename: username
      },
      { where: { id: id } }
    )
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
    })
})

// Atualizando Pessoas escolhidas

app.get('/pessoas/editarPessoa/:id', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  var id = req.params.id
  modelCPessoas.findOne({ where: { id: id } }).then(index => {
    var newDate =
      index.data.getDate() +
      '/' +
      (index.data.getMonth() + 1) +
      '/' +
      index.data.getFullYear()
    console.log(newDate + '    ' + index.data)
    res.render('./pessoas/editar', {
      variavel: index,
      newDate: newDate,
      UsernamePag: username
    })
  })
})

// Deletando produtos

app.post('/deletarProdutos', (req, res) => {
  var id = req.body.id
  modelCProdutos.destroy({ where: { id: id } }).then(() => {
    res.redirect('/produtos/consultaAll')
  })
})

app.get('/produtos/editar/:id', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  var id = req.params.id
  modelCProdutos.findOne({ where: { id: id } }).then(item => {
    res.render('./produtos/editar', { item: item, UsernamePag: username })
  })
})

// Atualização de produtos

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

//Cadastro de Pessoas

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

app.get('/sessao', (req, res) => {
  req.session.nome = 'José Henrique'
  res.send('json criado')
})

app.get('/resultado', (req, res) => {
  res.json({
    nome: req.session.nome
  })
})

app.get('/logoffandp', (req, res) => {
  req.session.nome = undefined
  res.send('Logoff Realizado')
})

app.get('/plataforma', (req, res) => {
  if (req.session.nome == undefined) {
    res.send('Faça login')
  } else {
    res.send('Bem vindo à Plataforma')
  }
})

//Unidades

app.get('/unidades/consulta', (req, res) => {
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }

  modelUnidades.findAll().then(data => {
    res.render('./unidades/consulta', { UsernamePag: username, items: data })
  })
})

app.get('/unidades/cadastro', (req, res) => {
  var username = ''
if (req.session.nome) {
    username = req.session.nome
  }
  res.render('./unidades/cadastro', { UsernamePag: username })
})

// cadastro Unidade

app.post('/cadastrarUnidade', (req, res) => {
  const local = req.body.Ilocal
  const numFunc = req.body.InumFunc

  modelUnidades.create({ local: local, numeroFuncionarios: numFunc })
  res.redirect('/')
})

// editar Unidade
app.get('/unidades/editar/:id', (req, res) => {
  var id = req.params.id
  var username = ''
  if (req.session.nome) {
    username = req.session.nome
  }
  modelUnidades.findOne({ where: { id: id } }).then(data => {
    res.render('./unidades/editar', { UsernamePag: username, item: data })
  })
})

app.post('/editarUnidade', (req, res) => {
  var local = req.body.Ilocal
  var NFunc = req.body.InumFunc
  var id = req.body.Iid
  modelUnidades
    .update(
      {
        local: local,
        numeroFuncionarios: NFunc
      },
      { where: { id: id } }
    )
    .then(res.redirect('/'))
})

//deletar unidade

app.get('/unidades/deletarUnidade/:id', (req, res) => {
  var id = req.params.id
  modelUnidades
    .destroy({ where: { id: id } })
    .then(res.redirect('/'))
    .catch(err => {
      console.log(err)
    })
})

// const mysql = require('mysql2')

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'noticia'
// })

const Sequelize = require('sequelize')
const mysql = require('mysql2')

const connection = new Sequelize({
  dialect: 'mysql',
  database: 'noticia',
  user: 'root',
  password: '1234',
  host: 'localhost',
  port: 3306
})

const modelPrincipal = connection.define('principal', {
  nome: {
    type: Sequelize.STRING,
    allowNULL: false
  }})


app.listen(port)

console.log('app Rodando na porta ' + port)
