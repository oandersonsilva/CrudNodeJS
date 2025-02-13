function rota(application, loginAuth, tableProdutos) {

    // consultar todos

    application.get('/produtos/consultaAll', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        tableProdutos
            .findAll({raw: true, order: ['valor']})
            .then(vetor => {
                res.render('../views/produtos/consultaAll', {
                    item: vetor,
                    UsernamePag: username
                })
            })
    })

    //Cadastro de Produtos

    application.post('/cadastroProdutos', (req, res) => {
        const descricao = req.body.Idescricao
        const valor = req
            .body
            .Ivalor

            tebleProdutos
            .create({descricao: descricao, valor: valor})
        console.log('cadastrado com sucesso')
        res.redirect('/')
    })

    // Abrir pagina cadastro de produtos

    application.get('/produtos/cadastro', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }
        res.render('../views/produtos/cadastro', {UsernamePag: username})
    })

    // Abrir pagina de consulta de produtos

    application.get('/produtos/consulta', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var item = []
        res.render('../views/produtos/consulta', {
            item: item,
            UsernamePag: username
        })
    })

    application.post('/produtos/consulta', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var descricao = req
            .body
            .descricao
            tableProdutos
            .findOne({
                where: {
                    descricao: descricao
                }
            })
            .then(item => {
                if (item != undefined) {
                    res.render('../views/produtos/consulta', {
                        item: item,
                        UsernamePag: username
                    })
                } else {}
            })
    })

    // Atualização de produtos

    application.post('/updateProdutos', (req, res) => {
        var id = req.body.id
        var descricao = req.body.Idescricao
        var valor = req
            .body
            .Ivalor
            console
            .log(`${id}, ${descricao}, e ${valor} `)
        tableProdutos
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

    // Deletando produtos

    application.post('/deletarProdutos', (req, res) => {
        var id = req
            .body
            .id
            tableProdutos
            .destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect('/produtos/consultaAll')
            })
    })

    application.get('/produtos/editar/:id', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var id = req
            .params
            .id
            tableProdutos
            .findOne({
                where: {
                    id: id
                }
            })
            .then(item => {
                res.render('../views/produtos/editar', {
                    item: item,
                    UsernamePag: username
                })
            })
    })

}

module.exports = rota;