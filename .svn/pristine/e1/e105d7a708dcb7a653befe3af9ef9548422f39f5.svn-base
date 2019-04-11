const userDao = require("../dao/userDao")

module.exports={
    cxbd(req,resp){
        userDao.userDao().then(function (connection) {
            var cxbdData = [];
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
            connection.query('SELECT xptj_imgSrc FROM t_xptj WHERE xptj_class="2" ' ,[])
                .then(function (data) {
                    var cxbdNew = data;
                    cxbdData.push(cxbdNew)
                    resp.render("view/cxbd",{data:cxbdData,user:user})
                })
        })
    }


}