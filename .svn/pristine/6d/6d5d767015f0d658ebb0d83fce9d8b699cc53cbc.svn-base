const express = require('express');
const goodsCtrl= require('../controller/goodsCtrl')
const goodsrouter = express.Router();
goodsrouter.get('/goods',goodsCtrl.getGoods);
goodsrouter.get('/caizhuang',goodsCtrl.getcaizhuang);
goodsrouter.get('/xiezhuang',goodsCtrl.getxiezhuang);
goodsrouter.get('/gelidishuang',goodsCtrl.getgelidishuang);
goodsrouter.get('/xiangfen',goodsCtrl.getxiangfen);
goodsrouter.get('/lvye',goodsCtrl.getlvye);
goodsrouter.get('/nanshi',goodsCtrl.getnanshi);
goodsrouter.get('/huli',goodsCtrl.gethuli);
goodsrouter.get('/search.do',goodsCtrl.getsearch);
goodsrouter.get('/getgoodxuanran.do',goodsCtrl.getgoodxuanran);
module.exports = goodsrouter;