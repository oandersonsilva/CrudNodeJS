function rota(application, loginAuth, tablePessoas) {
    //Pagina Cadastro
    application.get('/pessoas/cadastro', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }
        res.render('../views/pessoas/cadastro', {UsernamePag: username})
    })

    //Consulta
    application.get('/pessoas/consulta', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var varId = '1'

        tablePessoas
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
    })

    // Consulta de Pessoas

    application.post('/editarPessoa', (req, res) => {
        var id = req.body.id
        var nome = req.body.Inome
        var sobrenome = req.body.Isobrenome
        var data = req.body.Idata
        var telefone = req.body.Iphone
        var estado = req.body.Istate
        var username = req
            .body
            .Iusername

            tablePessoas
            .update({
                nome: nome,
                sobrenome: sobrenome,
                data: data,
                telefone: telefone,
                estado: estado,
                usename: username
            }, {
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            })
        })

    //Cadastro
    application.post('/pessoaCadastrada', (req, res) => {
        var nome = req.body.Inome
        var sobrenome = req.body.Isobrenome
        var email = req.body.Iemail
        var data = req.body.Idata
        var telefone = req.body.Iphone
        var estado = req.body.Istate
        var username = req.body.Iusername
        var senha = req
            .body
            .Ipassword

            console
            .log('Cadastro efetuado com sucesso')
        tablePessoas.create({
            nome: nome,
            email: email,
            sobrenome: sobrenome,
            data: data,
            telefone: telefone,
            estado: estado,
            username: username,
            senha: senha
        })
        console.log("Cadastro efetuado com sucesso!")
        res.redirect("../views/index")
    })

    // Atualizando Pessoas escolhidas

    application.get('/pessoas/editarPessoa/:id', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var id = req
            .params
            .id
            tablePessoas
            .findOne({
                where: {
                    id: id
                }
            })
            .then(index => {
                var newDate = index
                    .data
                    .getDate() + '/' + (
                    index.data.getMonth() + 1
                ) + '/' + index
                    .data
                    .getFullYear()
                console.log(newDate + '    ' + index.data)
                res.render('../views/pessoas/editar', {
                    variavel: index,
                    newDate: newDate,
                    UsernamePag: username
                })
            })
    })

    // Deletar Pessoas

    application.post('/deletarPessoa', (req, res) => {
        var id = req
            .body
            .id
            tablePessoas
            .destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect('../views/pessoas/consulta')
            })
    })

}

module.exports = rota;