const express = require('express')
const app = express()
const consign = require("consign")

require('dotenv').config()

app.use(express.json())

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Credentials", true)
  
  next()
})

//===========================
// Importação das rotas
//===========================
const UsersRoutes = require("../app/routes/UsersRoutes.js")
app.use("/users", UsersRoutes)

// Autoload da conexão com o banco de dados
consign()
    .include("./config/database.js")
    .into(app)

module.exports = app