EJS = Embedded JavaScript (motor de template => desenha um HTML)

<%= variavel %> - Exibir valor da variável

Utilizar arquivos estáticos no projeto
app.use(express.static('public'))

//Caminho do arquivo CSS

<link rel="stylesheet" href="/css/style.css">

criando formulario

<form action="/pagEnvioDados" method="post">
*necessário um button no final do form (input/button não funciona)

//no index.js
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/pagEnvioDados', (req, res) => {
res.send('deu certo')
})

instalando sequelize
npm install --save sequelize

//sequelize trabalhar com mysql
npm install --save mysql2

//Alterar senha do banco de dados
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nova_senha'

//ADD partials
<%- include('partials/navbar.ejs') %>

acessando variável no parametro
var x = req.params.variavel

instalar Bootstrap

baixar arquivos CSS e JS e salvá-los na pastas dentro do public
para acessá-los é necessário definir a pasta de arquivos estáticos
app.use(express.static('public'))

não esquecer de copiar e colar o jquery e o pooper

<!-- <script
  src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
  integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
  integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
  crossorigin="anonymous"
></script>
<script src="/js/bootstrap.min.js"></script> -->

Formulário / classes
div
container => centraliza os objetos
card
card-body / card-footer

botões
btn
btn-success
btn-primary

Enviar dados do formulário

<form method"POST" action="/nomeRota"> //method GET envia os dados pela URL

//no index.js
app.get("/nomeRota", (req, res)=>{
var nome = req.body.nome (nome de algum objeto da pagina que armazena um valor)
res.render("/nomeRota", { nome : nome })
})

//converter requisição em Json
//no index.js
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

instalar sequelize -> npm install --save sequelize
para trabalhar com sequelize -> npm install --save mysql2

acessar sequelizze

const Sequelize = require('sequelize')

const connection = new Sequelize('nameDatabase', 'root', 'senha', {
host:'localhost', //local do banco de dados
dialect:'mysql' //tipo de banco de dados
})

module.exports = connection;

testando conexão

// no arquivo index.js

const connection = require('nomeArquivoConexão')

connection.authenticate() //método 'authenticate()' tenta logar no banco de dados
.then(() =>{
console.log('conexão feita')
}).catch((err)=>{
console.log(err)
})

//Gerar uma tabela com model
Model => estrutura de dados que representa uma tabela

---

## |TABELA |

|Nome |
|Idade |
|Descricao| |

---

arquivo model tem a extensão (.js)

const Sequelize = require('sequelize')
const connection = require('./database.js')

const variavelTabela = connection.define('nomeTabela', {
Nome:{
type: Sequelize.STRING, //tipo string
allowNULL: false // não aceita valor nulo
},
Idade:{
type: Sequelize.INTEGER, // Tipo number
allowNULL: false // não aceita valor nulo
},
Descricao:{
type:Sequelize.text, //tipo Texto
allowNULL: true // Aceita valor nulo
}
})

variavelTabela.sync({ force: false}) //se tabela existe, não será necessário criar outra vez
.then(()=>{
console.log('tabela criada')
})

no arquivo index.js
const modelTabela = require(/arquivoModelTabela.js)

//Salvar arquivo no banco de dados
no arquivo de model.js

module.exports(variavelTabela)

no arquivo index.js
const modelTabela = require(arquivoModel.js)

app.post('/pagEnvioDados', (req, res)=>{
var var_nome = req.body.nome
var var_idade = req.body.idade
var var_descricao = req.body.descricao
modelTabela.create({
nome: var_nome, //campo da tabela = valor da variavel
idade: var_idade,
descricao: var_descricao,
}).then(()={
res.redirect('/') //se deu certo o Insert, redireciona o usuário para a pagina principal
})
})

buscar perguntas no banco de dados
app.get('/pagina',(req, res)=>{
//modo 1:
modelPergunta.findAll() //procura e retorna os dados da tabela (SELECT \* FROM TABELA)
.then(item => {
console.log(item)

    //modo 2:
    modelPergunta.findAll( raw: true ) //raw:true => retorna apenas os dados em forma de array
      .then(item => {
        console.log(item)

    //inserindo o array em uma variávell
    modelPergunta.findAll( raw: true )
      .then(item => {
        res.render('/pagina', { arrayDados: item })
      })

})

//imprimindo o array na pagina
<%- arrayDados.forEach(item){
%> <p> <%= item %> </p>
<% }> %>

ou

 <p> <%= arrayDados.item %> </p>'

// Ordenar array de dados

app.get('/pagina',(req, res)=>{

    modelPergunta.findAll( raw: true , order: ['id', 'ASC']) // order: ['campoTabela', 'ASC || DESC']
      .then(item => {
        res.render('/pagina', { arrayDados: item })
      })

})

//busca condicional
app.get('/pagina',(req, res)=>{
var valorPesquisa = 'Anderson'
modelTabela.findOne( {
where: { nome : valorPesquisa} //Pesquisar na tabela, campo: nome = Anderson
})
.then(item => {
if (item != undefined){ // achou o valor
res.render('/pagina', { arrayDados: item })
}else{
res.redirect('/')
}
})
})
   
   app.get('/pagina',(req, res)=>{
var valorPesquisa = 'Anderson'
modelTabela.findOne( {
where: { nome : valorPesquisa} //Pesquisar na tabela, campo: nome = Anderson
})
.then(item => {
if (item != undefined){ // achou o valor
res.render('/pagina', { arrayDados: item })
}else{
res.redirect('/')
}
})
})

//Model de resposta

//edição pelo celular
