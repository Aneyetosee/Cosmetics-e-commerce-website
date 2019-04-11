const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/userCtrl')
const messageCtrl = require('../controller/messageCtrl')


router.get('/loginDoIt',userCtrl.loginDoIt)

// 页面拦截
router.get('/personalCenter',userCtrl.personalCenter)
router.get('/modify',userCtrl.modify)
router.get('/order',userCtrl.order)
router.get('/shippingAddress',userCtrl.shippingAddress)
router.get('/Integral',userCtrl.Integral)
router.get('/cancellation',userCtrl.cancellation)

//资料修改拦截
router.post('/changeModify.do',userCtrl.changeModify)
router.post('/modifyPassword.do',userCtrl.modifyPassword)
//短信拦截
router.post('/newPhoneSms.do',messageCtrl.newPhoneSms)
router.post('/newPhoneVerificationCode.do',messageCtrl.newPhoneVerificationCodeDo)
//地址拦截
router.post('/shippingAddress.do',userCtrl.shippingAddressDo)
router.post('/chooseAddress.do',userCtrl.chooseAddressDo)
router.post('/delAddress.do',userCtrl.delAddressDo)
router.post('/selectTheDefault.do',userCtrl.selectTheDefaultDo)
//评论拦截
router.post('/massageContent.do',userCtrl.massageContentDo)
//搜索拦截
router.post('/searchOrder.do',userCtrl.searchOrderDo)
//订单拦截
router.post('/makeSure.do',userCtrl.makeSureDo)
router.post('/details.do',userCtrl.detailsDo)
router.post('/clearOrder.do',userCtrl.clearOrderDo)

//常见问题页面
router.get('/question',userCtrl.question)

module.exports = router