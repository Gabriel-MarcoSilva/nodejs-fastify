require('dotenv').config()
const pgp = require('pg-promise')()
const { join } = require('node:path')

//criar conexões com o banco
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB}`)

// db.query('SELECT 1 + 1 AS result').then((result) => console.log(result)) //permite consulta no db

const fiePath = join(__dirname, "create-tables.sql")
const query = new pgp.QueryFile(fiePath)
db.query(query)

module.exports = db