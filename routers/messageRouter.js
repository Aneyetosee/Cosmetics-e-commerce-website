const express = require('express')
const router = express.Router()
const messageCtrl = require('../controller/messageCtrl')

router.post("/sms.do",messageCtrl.logsmsPhone)
router.post("/regsms.do",messageCtrl.regsmsPhone)
router.post("/forgotPwdsms.do",messageCtrl.forgotPwdsms)
router.post("/verifyCode.do",messageCtrl.logverifyCode)
router.post("/regVerifyCode.do",messageCtrl.regVerifyCode)
router.post("/modifyVerifyCode.do",messageCtrl.modifyVerifyCode)


module.exports = router