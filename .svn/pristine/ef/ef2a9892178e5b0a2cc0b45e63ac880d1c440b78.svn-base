const userDao = require('../dao/userDao')

module.exports = {
     //渲染页面函数
    details(req,resp){
        let deatilsItem = req.query.id

        userDao.userDao().then(function (connection) {
            if(!req.session.data){
                var user = {
                    dataType:false,
                    u_nickname:undefined,
                    u_phone:undefined
                }
            }else{
                var user = {
                    dataType:req.session.data.dataType,
                    u_nickname:req.session.data.u_nickname,
                    u_phone:req.session.data.u_phone
                }
            }
            connection.query("SELECT * FROM t_details WHERE d_id=?",[deatilsItem])
                .then(function (data) {
                    //将字符串中的asd替换成<br/>换行    在ejs文件中要显示html标签不能用<%=  %> 要用<%- %>
                    data[0].d_describe=data[0].d_describe.replace(/asd/g," <br/>")
                   /* console.log(data[0].d_describe)*/
                 resp.render("view/details",{details:data,user:user})
                })
        })

    },

    //立即支付验证是否登录
    verification(req,resp){

        let {buyId,buyNumber} = req.body
        if(!req.session.data){
            var user = {
                dataType:false,
                u_nickname:undefined,
                u_phone:undefined
            }
        }else{
            var user = {
                dataType:req.session.data.dataType,
                u_nickname:req.session.data.u_nickname,
                u_phone:req.session.data.u_phone
            }
        }



        /*console.log(buyId,buyNumber,mySeccion.u_nickname)*/
        if(user.dataType){
            //订单编号
            let mytime = new Date().getTime()
            //订单编号转化为字符串
            let dingdan  = mytime.toString()
            //获取当前时间  2019/2/22 下午2:42:38格式
            let c_time = new Date()
            c_time = c_time.toLocaleString()

            userDao.userDao().then(function (connection) {

                connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10)",[user.u_phone,mytime])
       /*         connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10)",[mySeccion.u_phone,mytime])
                connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10)",[mySeccion.u_phone,mytime])*/

                    .then(function (data) {
                        connection.query("INSERT INTO order_detail VALUES (NULL,?,0,?,?,?)",[buyId,c_time,mytime,buyNumber])
                            .then(function (data) {
                                if(data){

                                    resp.send(dingdan)
                                }
                            })
                    })
            })
        }else{
            resp.send("0")
        }
    },
    //点击购物车   验证函数
    deailsGou(req,resp){

        let {buyId,buyNumber} = req.body
        if(!req.session.data){
            var user = {
                dataType:false,
                u_nickname:undefined,
                u_phone:undefined
            }
        }else{
            var user = {
                dataType:req.session.data.dataType,
                u_nickname:req.session.data.u_nickname,
                u_phone:req.session.data.u_phone
            }
        }
        if(user.dataType){
            userDao.userDao().then(function (connection) {
                //查询  where  用户名和id
                connection.query("SELECT * FROM order_cart WHERE o_g_id=?  AND o_u_id=?",[buyId,user.u_phone])
                    .then(function (data) {
                        /* console.log(mySeccion.u_nickname)*/
                        //如果有相同的就先加   数量在加入数据库
                        if(data.length>0){
                            asd = Number(data[0].o_class_num) +Number(buyNumber)
                            connection.query("UPDATE order_cart SET o_class_num=? WHERE o_g_id=? AND o_u_id=?",[asd,buyId,user.u_phone])
                                .then(function (data) {
                                   resp.send("加入购物车成功")
                                }).catch(function (err) {
                                  resp.send("加入购物车失败")
                            })
                        }   //如果没有相同的   就直接加入数据库
                        else{
                            connection.query("INSERT INTO order_cart VALUES (NULL,?,?,?)",[buyId,user.u_phone,buyNumber])
                                .then(function (data) {
                                    resp.send("加入购物车成功")
                                })
                        }
                    })
            })

        }else{
           resp.send("1")
        }
    },
    //渲染评论
    comment_cont(req,resp){
        if(!req.session.data){
            var user = {
                dataType:false,
                u_nickname:undefined,
                u_phone:undefined
            }
        }else{
            var user = {
                dataType:req.session.data.dataType,
                u_nickname:req.session.data.u_nickname,
                u_phone:req.session.data.u_phone
            }
        }
        let {buyId} = req.body
        userDao.userDao().then(function (connection) {
            connection.query("SELECT * FROM t_comment_t WHERE comment_id=?",[buyId])
                .then(function (data) {
                    /* console.log(mySeccion.u_nickname)*/
                    if(data){
                        resp.send(data)
                    }
                })
        })
    },
    //chengg页面
    chengg(req,resp){
        userDao.userDao().then(function (connection) {
            if(!req.session.data){
                var user = {
                    dataType:false,
                    u_nickname:undefined,
                    u_phone:undefined
                }
            }else{
                var user = {
                    dataType:req.session.data.dataType,
                    u_nickname:req.session.data.u_nickname,
                    u_phone:req.session.data.u_phone
                }
            }
            resp.render("view/chengg",{user:user})
        })

    }
}
