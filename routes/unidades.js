function rota(application, loginAuth, tableUnidades) {

    //Unidades

    application.get('/unidades/consulta', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        tableUnidades
            .findAll()
            .then(data => {
                res.render('../views/unidades/consulta', {
                    UsernamePag: username,
                    items: data
                })
            })
    })

    application.get('/unidades/cadastro', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }
        res.render('../views/unidades/cadastro', {UsernamePag: username})
    })

    // cadastro Unidade

    application.post('/cadastrarUnidade', (req, res) => {
        const local = req.body.Ilocal
        const numFunc = req
            .body
            .InumFunc

            tableUnidades
            .create({local: local, numeroFuncionarios: numFunc})
        res.redirect('/')
    })

    // editar Unidade
    application.get('/unidades/editar/:id', (req, res) => {
        var id = req.params.id
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }
        tableUnidades
            .findOne({
                where: {
                    id: id
                }
            })
            .then(data => {
                res.render('../views/unidades/editar', {
                    UsernamePag: username,
                    item: data
                })
            })
    })

    application.post('/editarUnidade', (req, res) => {
        var local = req.body.Ilocal
        var NFunc = req.body.InumFunc
        var id = req
            .body
            .Iid
            tableUnidades
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

    application.get('/unidades/deletarUnidade/:id', (req, res) => {
        var id = req
            .params
            .id
            tableUnidades
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

}

module.exports = rota;