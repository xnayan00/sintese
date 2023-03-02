const Teachers = require("express").Router()
const TeachersController = require("../controllers/TeachersController")

Teachers.get("/", TeachersController.index)
Teachers.post("/", TeachersController.store)
Teachers.patch("/:id", TeachersController.update)
Teachers.delete("/:id", TeachersController.destroy)

module.exports = Teachers