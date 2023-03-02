const Invoicings = require("express").Router()
const InvoicingsController = require("../controllers/InvoicingsController")

Invoicings.get("/", InvoicingsController.index)
Invoicings.post("/", InvoicingsController.store)
Invoicings.delete("/:id", InvoicingsController.destroy)

module.exports = Invoicings