const herokuConfigs = {
    host: 'ds153566.mlab.com',
    port: '53566',
    auth: 'heroku_x4b1bbw2:a8b4oh91gdg80ekftok3cf957j@',
    db: 'heroku_x4b1bbw2'
};

const localConfigs = {
    host: '127.0.0.1',
    port: '27017',
    auth: '',
    db: 'risk-assessment'
};

const configs = process.env.MONGODB_URI ? herokuConfigs : localConfigs;
const url = `mongodb://${configs.auth}${configs.host}:${configs.port}/${configs.db}`;

module.exports.configs = configs;
module.exports.url = url;