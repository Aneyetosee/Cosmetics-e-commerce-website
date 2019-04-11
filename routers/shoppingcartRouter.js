const express = require("express")
const shoppingcartCtrl = require("../controller/shoppingcartCtrl")


const router = express.Router()
router.get("/shoppingCart",shoppingcartCtrl.shoppingCart)
router.post("/myShoppingDel.do",shoppingcartCtrl.myShoppingDelectCart)
router.post("/myOrderformData.do",shoppingcartCtrl.myOrderformData)
router.post("/myShangChuanData.do",shoppingcartCtrl.myShanChuanData)




module.exports = router