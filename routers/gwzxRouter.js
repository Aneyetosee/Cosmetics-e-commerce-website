const express = require("express")
const gwzxCtrl = require("../controller/gwzxCtrl")

const router = express.Router()
router.get("/gwzx",gwzxCtrl.gwzx)

module.exports = router