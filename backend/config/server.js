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

const TeachersRoutes = require("../app/routes/TeachersRoutes.js")
app.use("/teachers", TeachersRoutes)

const StudentsRoutes = require("../app/routes/StudentsRoutes.js")
app.use("/students", StudentsRoutes)

const TeamsRoutes = require("../app/routes/TeamsRoutes.js")
app.use("/teams", TeamsRoutes)

const ModalitiesRoutes = require("../app/routes/ModalitiesRoutes.js")
app.use("/modalities", ModalitiesRoutes)

const InvoicingsRoutes = require("../app/routes/InvoicingsRoutes.js")
app.use("/invoicings", InvoicingsRoutes)

const OutgoingsRoutes = require("../app/routes/OutgoingsRoutes.js")
app.use("/outgoings", OutgoingsRoutes)

//===========================
// Autoload da conexão com o
// banco de dados
//===========================
consign()
    .include("./config/database.js")
    .into(app)

module.exports = app