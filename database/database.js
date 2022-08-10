const Sequelize = require('sequelize')
const mysql = require('mysql2')

const connection = new Sequelize('DATACRUD', 'root', '123456', {
  local: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
