const express = require('express')
const logger = require('morgan')
const bodyParser =require('body-parser')
const favicon = require('serve-favicon')
const session = require('express-session')
const cookie = require('cookie-parser')
//创建router变量
const userRouter = require('./routers/userRouter')
const indexRouter = require('./routers/indexRouter')
const detailsRouter = require('./routers/detailsrouters')
const messageRouter = require('./routers/messageRouter')
const gwzxRouter = require('./routers/gwzxRouter')
const xptjRouter = require('./routers/xptjRouter')
const goodsRouter = require('./routers/goodsRouter')
const shoppingcartRouter = require('./routers/shoppingcartRouter')
const lijizhifu = require('./routers/lijizhifu')

const app = express()

app.use(logger('dev'))

app.use(cookie())
app.use(session({
    name:'mydemo',
    secret:'1234',
    resave:true,
    rolling:true,
    cookie:{maxAge:300000},//5分钟
    saveUninitialized:true
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//router引入写在下方
app.use(userRouter)
app.use(indexRouter)
app.use(detailsRouter)
app.use(messageRouter)
app.use(gwzxRouter)
app.use(xptjRouter)
app.use(lijizhifu)

app.use(goodsRouter)
app.use(shoppingcartRouter)
app.set('views',__dirname+'/src')
app.set('view engine','ejs')

app.use(express.static(__dirname+'/src'))
//配置网页小icon
app.use(favicon(__dirname+"/src/images/S.png"))
app.listen(8888,()=>{
    console.log('服务器已启动')
})
