const userDao = require('../dao/userDao')

module.exports = {
    shoppingCart(req,resp){
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
                if (user.dataType) {
                    let u_phone=user.u_phone
                    connection.query("SELECT o_g_id,u_phone,d_smallSrc,d_chinese,d_Price,o_class_num FROM order_cart JOIN t_details ON o_g_id = d_id JOIN t_user ON o_u_id = u_phone WHERE o_g_id = d_id AND o_u_id = ?",[u_phone])
                        .then(function (data) {
                            // var itemNew = data
                            // console.log(data)
                            resp.render('view/shoppingCart',{data,user:user})
                            // user:user
                        })
                }else {
                    resp.redirect("index")
                }
            }
        })
    },
    myShoppingDelectCart(req,resp){
        let {myCommodityId,userNameId} = req.body
        userDao.userDao().then(function (connection) {
            connection.query("delete from order_cart where o_g_id = ?",[myCommodityId,userNameId])
                .then(function (data) {
                    if (data){
                        resp.send("1")
                    }
                    // console.log(myCommodityId)
                })
        })
    },
    myOrderformData(req, resp) {
        let {myShangPingId, myShangPingVal, myTime} = req.body
        // console.log(myShangPingId,myShangPingVal,myTime);
        // 电话
        var userPhone = req.session.data.u_phone
        // 时间
        var myCurrentTime = new Date()
        // 订单号
        // let time = new Date().getTime()
        // 总价
        let newData
        userDao.userDao().then(function (connection) {
            // insert into t_user values (null,?,?,?,?,?,?)
            connection.query('insert into order_detail values (null,?,0,?,?,?)', [myShangPingId, myCurrentTime, myTime, myShangPingVal])
                .then(function (data) {

                    if (data) {
                        newData = data
                        console.log(1)
                    }
                    connection.query("delete from order_cart where o_g_id = ? and o_u_id = ?", [myShangPingId, userPhone])
                    // connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,?)",[userPhone,time,zhaungtai])
                    // connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,?)",[userPhone,time,zhaungtai])
                        .then(function (data) {
                            if (newData) {
                                console.log(3)
                            }
                        })
                })

            // })
        })
        /* let {arrIdString, time} = req.body
         let zhaungtai = 10
         // let myCurrentTime = new Date()+"";

         let userPhone = req.session.data.u_phone
         // console.log(userPhone)
         let newArrIdString = JSON.parse(arrIdString)
         var dates={
             date:new Date(),
             year:function(){
                 return this.date.getFullYear();
             },
             month:function(){
                 return this.date.getMonth()+1;
             },
             day:function(){
                 return this.date.getDate();
             },
             week:function(){
                 return this.date.getDay();
             },
             hour:function(){
                 return this.date.getHours();
             },
             minute:function(){
                 return this.date.getMinutes();
             },
             second:function(){
                 return this.date.getSeconds();
             }
         }
         var myCurrentTime=dates.year()+'-'+dates.month()+'-'+dates.day()+' '+dates.hour()+":"+dates.minute();


         // let duixiang3 =
         // console.log(duixiang3)
         // console.log(newArrIdString.id)
         // console.log(123)
         let arr = []
         var myShoppingMysql
         if (newArrIdString.length==1){
             arr.push(newArrIdString[0].id, myCurrentTime, time, newArrIdString[0].num)
              myShoppingMysql = "insert into order_detail values(null,?,0,?,?,?)"
         } else {
             let sql = ",(null,?,0,?,?,?)"
              myShoppingMysql = "insert into order_detail values (null,?,0,?,?,?)"
             for (let i = 0; i <newArrIdString.length; i++) {
                     myShoppingMysql = myShoppingMysql + sql
                     arr.push(newArrIdString[i].id, myCurrentTime, time, newArrIdString[i].num)

             }
             console.log(myShoppingMysql)
         }





         // 商品id获取
         let shoppingId = []
         for (let i = 0; i < newArrIdString.length; i++) {
             shoppingId.push(newArrIdString[i].id)
             shoppingId.push(userPhone)
         }
             let newData
             console.log(arr)
             userDao.userDao().then(function (connection) {
                 // insert into t_user values (null,?,?,?,?,?,?)

                 connection.query(myShoppingMysql, arr)
                     .then(function (data) {
                         if (data) {
                             console.log(myCurrentTime)
                         }
                         connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,null,?)", [userPhone, time, zhaungtai])
                             .then(function (data) {
                                 if (data) {
                                     newData = data
                                 }
                                 connection.query("delete from order_cart where o_g_id = ? and o_u_id = ?", shoppingId)
                                     .then(function (data) {
                                         if (newData) {
                                             console.log(250)
                                         }
                                     })
                             })

                     })
             })

 */
    },
    myShanChuanData(req,resp){
        // 订单号，总价
        let {myTime,zongJiaText} = req.body
        // console.log(myTime, zongJiaText);
        // 折扣
        let zhaungtai = 10
        // 电话号码
        let myUserPhone = req.session.data.u_phone
        // console.log(myUserPhone)
        userDao.userDao().then(function (connection) {
            connection.query("INSERT INTO t_order VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,?,NULL,NULL,NULL,NULL,NULL,null,?)", [myUserPhone, myTime,zongJiaText,zhaungtai])
            .then(function (data) {
                if (data) {
                    console.log(2)
                }
            })
        })
    }
}