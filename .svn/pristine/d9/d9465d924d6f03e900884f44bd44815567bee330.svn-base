const userDao = require("../dao/userDao")

module.exports={
    gwzx(req,resp){
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
            connection.query('SELECT tz_imgSrc,d_id FROM tz_gwzx join t_details where tz_name=d_chinese order by tz_imgSrc ' ,[])
                .then(function (data) {
                   console.log(data)
                    resp.render("view/gwzx",{data:data,user:user})
                })
        })
    }
}
