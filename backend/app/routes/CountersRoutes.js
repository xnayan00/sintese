const Counters = require("express").Router()
const CountersController = require("../controllers/CountersController")

Counters.get("/", CountersController.index)

module.exports = Counters