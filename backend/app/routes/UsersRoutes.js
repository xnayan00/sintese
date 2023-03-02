const Users = require("express").Router()
const UsersController = require("../controllers/UsersController")

Users.get("/", UsersController.index)
Users.post("/", UsersController.store)
Users.patch("/:id", UsersController.update)
Users.delete("/:id", UsersController.destroy)

module.exports = Users