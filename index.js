const express = require('express')
const app = express()
const bodyParser = require('body-parser') //trabalha com os dados vindos dos clientes atraves do form e os transforma em objeto JS dentro do Req.body
const modelCPessoas = require('./database/modelCPessoas')
const modelCProdutos = require('./database/modelCProdutos')

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
rotaPessoas(app, loginAuth, modelCPessoas);

var rotaProdutos = require('./routes/produtos')
rotaProdutos(app, loginAuth, modelCProdutos)

var rotaUnidades = require('./routes/unidades')
rotaUnidades(app, loginAuth, modelUnidades)

//________________________________________________________

app.get('/produtos/cadastro', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }
    res.render('./produtos/cadastro', {UsernamePag: username})
})

app.get('/produtos/consulta', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }

    var item = []
    res.render('./produtos/consulta', {
        item: item,
        UsernamePag: username
    })
})

app.post('/produtos/consulta', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }

    var descricao = req
        .body
        .descricao
        modelCProdutos
        .findOne({
            where: {
                descricao: descricao
            }
        })
        .then(item => {
            if (item != undefined) {
                res.render('./produtos/consulta', {
                    item: item,
                    UsernamePag: username
                })
            } else {}
        })
})

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

app.get('/produtos/consultaAll', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }

    modelCProdutos
        .findAll({raw: true, order: ['valor']})
        .then(vetor => {
            res.render('./produtos/consultaAll', {
                item: vetor,
                UsernamePag: username
            })
        })
})


// Deletando produtos

app.post('/deletarProdutos', (req, res) => {
    var id = req
        .body
        .id
        modelCProdutos
        .destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/produtos/consultaAll')
        })
})

app.get('/produtos/editar/:id', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }

    var id = req
        .params
        .id
        modelCProdutos
        .findOne({
            where: {
                id: id
            }
        })
        .then(item => {
            res.render('./produtos/editar', {
                item: item,
                UsernamePag: username
            })
        })
})

// Atualização de produtos

app.post('/updateProdutos', (req, res) => {
    var id = req.body.id
    var descricao = req.body.Idescricao
    var valor = req
        .body
        .Ivalor
        console
        .log(`${id}, ${descricao}, e ${valor} `)
    modelCProdutos
        .update({
            descricao: descricao,
            valor: valor
        }, {
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/produtos/consultaAll')
        })
})

//Cadastro de Produtos

app.post('/cadastroProdutos', (req, res) => {
    const descricao = req.body.Idescricao
    const valor = req
        .body
        .Ivalor

        modelCProdutos
        .create({descricao: descricao, valor: valor})
    console.log('cadastrado com sucesso')
    res.redirect('/')
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

//Unidades

app.get('/unidades/consulta', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }

    modelUnidades
        .findAll()
        .then(data => {
            res.render('./unidades/consulta', {
                UsernamePag: username,
                items: data
            })
        })
})

app.get('/unidades/cadastro', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }
    res.render('./unidades/cadastro', {UsernamePag: username})
})

// cadastro Unidade

app.post('/cadastrarUnidade', (req, res) => {
    const local = req.body.Ilocal
    const numFunc = req
        .body
        .InumFunc

        modelUnidades
        .create({local: local, numeroFuncionarios: numFunc})
    res.redirect('/')
})

// editar Unidade
app.get('/unidades/editar/:id', (req, res) => {
    var id = req.params.id
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }
    modelUnidades
        .findOne({
            where: {
                id: id
            }
        })
        .then(data => {
            res.render('./unidades/editar', {
                UsernamePag: username,
                item: data
            })
        })
})

app.post('/editarUnidade', (req, res) => {
    var local = req.body.Ilocal
    var NFunc = req.body.InumFunc
    var id = req
        .body
        .Iid
        modelUnidades
        .update({
            local: local,
            numeroFuncionarios: NFunc
        }, {
            where: {
                id: id
            }
        })
        .then(res.redirect('/'))
})

//deletar unidade

app.get('/unidades/deletarUnidade/:id', (req, res) => {
    var id = req
        .params
        .id
        modelUnidades
        .destroy({
            where: {
                id: id
            }
        })
        .then(res.redirect('/'))
        .catch(err => {
            console.log(err)
        })
    })


// const Sequelize = require('sequelize')
// const mysql = require('mysql2')

// const connection = new Sequelize({
//     dialect: 'mysql',
//     database: 'noticia',
//     user: 'root',
//     password: '1234',
//     host: 'localhost',
//     port: 3306
// })



app.listen(port)

console.log('app Rodando na porta ' + port)
