function mostrarSenha(checkBox) {
  var senha = document.getElementById('Ipassword')

  if (checkBox.checked) {
    senha.type = 'text'
  } else {
    senha.type = 'password'
  }
}
