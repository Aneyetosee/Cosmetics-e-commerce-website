const controller = require("../controller/detailsCont")
const express = require("express")
const router = express.Router()
//渲染页面
router.get("/details",controller.details)
//点击立即支付验证登录
router.post("/verification",controller.verification)
//加入购物车
router.post("/deailsGou.do",controller.deailsGou)

//渲染评论
router.post("/comment_cont",controller.comment_cont)
//支付成功返回页面
router.get("/chengg",controller.chengg)


module.exports = router