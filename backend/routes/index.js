const express = require("express")
const router = express.Router()

const routerPersons = require("./persons")
const routerTeams = require("./teams")

router.use("/persons", routerPersons)
router.use("/teams", routerTeams)

module.exports = router