const express = require('express')
const app = express()
const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes atraves do form e os transforma em objeto JS dentro do Req.body
const modelPessoas = require('./database/modelPessoas')
const modelProdutos = require('./database/modelProdutos')

const session = require('express-session')
const loginAuth = require('./middlewares/loginAuth')
const bcrypt = require('bcryptjs')
const modelUnidades = require('./database/modelUnidades')

app.use(bodyParser.urlencoded({extended: false})) //evita que utilizem campos encadeados
app.use(bodyParser.json())
app.use(session({
    secret: 'asdga skdjaçsdjhaçsjhd',
    cookie: {
        maxAge: 3000000
    }
}))

port = 3000
// app.use(express.static('public'))
app.set('view engine', 'ejs')

//Rotas

var rotaIndex = require('./routes/index')
rotaIndex(app)

var rotaPessoas = require('./routes/pessoas')
rotaPessoas(app, loginAuth, modelPessoas);

var rotaProdutos = require('./routes/produtos')
rotaProdutos(app, loginAuth, modelProdutos)

var rotaUnidades = require('./routes/unidades')
rotaUnidades(app, loginAuth, modelUnidades)

//________________________________________________________



//Sessão de login

app.get('/login', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }
    res.render('login', {UsernamePag: username})
})

app.post('/logando', (req, res) => {
    req.session.nome = req
        .body
        .Iusername
        res
        .redirect('/')
})

app.get('/logoff', (req, res) => {
    req.session.nome = undefined
    res.redirect('/login')
})


app.get('/sessao', (req, res) => {
    req.session.nome = 'José Henrique'
    res.send('json criado')
})

app.get('/resultado', (req, res) => {
    res.json({nome: req.session.nome})
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

app.listen(port)

console.log('app Rodando na porta ' + port)
