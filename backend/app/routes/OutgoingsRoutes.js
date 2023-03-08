const Outgoings = require("express").Router()
const OutgoingsController = require("../controllers/OutgoingsController")

Outgoings.get("/", OutgoingsController.index)
Outgoings.post("/", OutgoingsController.store)
Outgoings.delete("/:id", OutgoingsController.destroy)

module.exports = Outgoings