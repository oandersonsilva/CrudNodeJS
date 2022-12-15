function loginAuth(req, res, next) {
  if (req.session.nome != undefined) {
    next()
  } else {
    var username = ''

    res.render('login', { UsernamePag: '' })
  }
}

module.exports = loginAuth
