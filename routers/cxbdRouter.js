const express = require("express")
const cxbdCtrl = require("../controller/cxbdCtrl")
const router = express.Router()
router.get("/cxbd",cxbdCtrl.cxbd)
module.exports = router