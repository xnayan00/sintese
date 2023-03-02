const Students = require("express").Router()
const StudentsController = require("../controllers/StudentsController")

Students.get("/", StudentsController.index)
Students.post("/", StudentsController.store)
Students.patch("/:id", StudentsController.update)
Students.delete("/:id", StudentsController.destroy)

module.exports = Students