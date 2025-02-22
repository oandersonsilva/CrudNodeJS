function rota(application, loginAuth, tablePessoas) {

                        /* ROTAS */
 //Pagina Cadastro
 application.get('/pessoas/cadastro', (req, res) => {
    var username = ''
    if (req.session.nome) {
        username = req.session.nome
    }
    res.render('../views/pessoas/cadastro', {UsernamePag: username})
})



                        /* ACESSO */


//Cadastro

application.post('/pessoaCadastrada', (req, res) => {

    let pessoa = {}
    pessoa.nome = req.body.Inome
    pessoa.sobrenome = req.body.Isobrenome
    pessoa.email = req.body.Iemail
    pessoa.data = req.body.Idata
    pessoa.telefone = req.body.Iphone
    pessoa.estado = req.body.Istate
    pessoa.username = req.body.Iusername
    pessoa.senha = req.body.Ipassword

    tablePessoas.cadastro(pessoa, function(){
        res.redirect("../views/index")
        console.log("Cadastro efetuado com sucesso!")
    })


    // tablePessoas.create({
    //     nome: nome,
    //     email: email,
    //     sobrenome: sobrenome,
    //     data: data,
    //     telefone: telefone,
    //     estado: estado,
    //     username: username,
    //     senha: senha
    // })
    
    
})

 // Editar de Pessoas

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















    //Consulta
    application.get('/pessoas/consulta', (req, res) => {
        var username = ''
        if (req.session.nome) {
            username = req.session.nome
        }

        var varId = '1'

        
        var p = new tablePessoas
        console.log(p)
        res.redirect('/')




        // tablePessoas
        //     .findAll({raw: true})
        //     .then(item => {
        //         if (item != undefined) {
        //             res.render('../views/pessoas/consulta', {
        //                 variavel: item,
        //                 UsernamePag: username
        //             })
        //         } else {
        //             res.redirect('../')
        //         }
        //     })
    })

    

    

   

}

module.exports = rota;