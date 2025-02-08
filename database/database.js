const Sequelize = require('sequelize')
const mysql = require('mysql2')

const connection = new Sequelize(
  'bancodados', 'root', '1234', {
  dialect: 'mysql',
  local: 'localhost',

})

module.exports = connection
