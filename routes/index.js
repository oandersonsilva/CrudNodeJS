function rota(application){

    application.get('/', (req, res) => {
        var username = ''
        if (req.session.nome) {
          username = req.session.nome
        }
        res.render('../views/index', { UsernamePag: username })
      })
}

module.exports = rota;
