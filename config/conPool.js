const mysql= require("promise-mysql")
const pool = mysql.createPool({
    host: 'rm-bp12f722p3nt876asyo.mysql.rds.aliyuncs.com',
    user: 'publicuser',
    password: 'aA123456',
    database: 'xm_4_z',
    connectionLimit: 15
});
module.exports = pool