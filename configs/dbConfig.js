const mysql = require('mysql');

const herokuConfigs = {
    host: 'ds153566.mlab.com',
    port: '53566',
    auth: 'heroku_x4b1bbw2:a8b4oh91gdg80ekftok3cf957j',
    db: 'heroku_x4b1bbw2'
};

const localConfigs = {
    host: '127.0.0.1',
    port: '27017',
    auth: '',
    db: 'risk-assessment'
};
const configs = process.env.MONGODB_URI ? herokuConfigs : localConfigs;
const url = `mongodb://${configs.auth}@${configs.host}:${configs.port}/${configs.db}`;

const pool = mysql.createPool({
    host: "162.241.216.182",
    user: "servivec_dev",
    password: "rIV;.y(a0G=+",
    database: "servivec_safeable_data"
  });

module.exports.configs = configs;
module.exports.url = url;
module.exports.pool = pool;