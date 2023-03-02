const Teams = require("express").Router()
const TeamsController = require("../controllers/TeamsController")

Teams.get("/", TeamsController.index)
Teams.post("/", TeamsController.store)
Teams.patch("/:id", TeamsController.update)
Teams.delete("/:id", TeamsController.destroy)

module.exports = Teams