const pool = require('../config/conPool')

module.exports = {
    userDao(){
        return pool.getConnection()
    }
}