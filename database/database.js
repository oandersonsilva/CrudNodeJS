const Sequelize = require('sequelize')
const mysql = require('mysql2')

const connection = new Sequelize({
  dialect: 'mysql',
  database: 'bancodados',
  user: 'root',
  password: '1234',
  host: 'localhost',
  port: 3306
})

module.exports = connection


// const Sequelize = require('sequelize')
// const mysql = require('mysql2')

// const connection = new Sequelize(
//   'DATACRUD', 'root', '1234', {
//   local: 'localhost',
//   dialect: 'mysql'
// })

// module.exports = connection