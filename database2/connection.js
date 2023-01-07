var sequelize = require('sequelize')
const mysql = require('mysql2')

var connection = new sequelize('UNIDADES', 'root', '123456', {
  local: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
