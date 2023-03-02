const Modalities = require("express").Router()
const ModalitiesController = require("../controllers/ModalitiesController")

Modalities.get("/", ModalitiesController.index)
Modalities.post("/", ModalitiesController.store)
Modalities.patch("/:id", ModalitiesController.update)
Modalities.delete("/:id", ModalitiesController.destroy)

module.exports = Modalities