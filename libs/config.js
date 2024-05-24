var logger = require("./logger.js");

module.exports = {
    database:"ordergenius",
    username:"",
    password:"",
    params: {
        dialect:"sqlite",
        storage:"ordergenius.sqlite",
        Logging: (sql) => {
            logger.info(sql);
        },
        define: {
            underscored:true
        }
    },
};