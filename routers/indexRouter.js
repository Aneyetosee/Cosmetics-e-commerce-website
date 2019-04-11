const express = require("express")
const pageCtrl = require("../controller/pageCtrl")

const router = express.Router()

router.get("/index",pageCtrl.index)
router.get("/service",pageCtrl.service)
router.post("/login.do",pageCtrl.loginDo)
router.post("/logout.do",pageCtrl.logoutDo)
router.post("/regTestEmail.do",pageCtrl.regTestEmail)
router.post("/regTestPhone.do",pageCtrl.regTestPhone)
router.post("/reg.do",pageCtrl.reg)
router.post("/search.do",pageCtrl.search)
router.post("/chooseData.do",pageCtrl.chooseData)
router.get("/safetyPay",pageCtrl.safetyPay)
router.get("/periodicalIndex",pageCtrl.periodicalIndex)
router.get("/periodicalPage1",pageCtrl.periodicalPage1)



module.exports = router