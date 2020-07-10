/* eslint valid-jsdoc: "off" */

'use strict';

const cryptoUtil = require('../app/utils/crypto/cryptoUtil');
const properties = require('./config.self');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.cluster = {
    listen: {
      path: '',
      port: 8004,
      hostname: '127.0.0.1',
    },
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'personal-manage',
    host: cryptoUtil.privateDecrypt(properties.dbConfig.host).toString(),
    // host: '47.104.199.74',
    port: cryptoUtil.privateDecrypt(properties.dbConfig.port).toString(),
    // port: 3306,
    username: cryptoUtil.privateDecrypt(properties.dbConfig.user).toString(),
    password: cryptoUtil.privateDecrypt(properties.dbConfig.password).toString(),
    // password: '123Qwe!!',
    timezone: '+08:00',
    // 解决时间误差8小时问题
    define: {
      underscored: true,
      freezeTableName: true, // use singular table name
      timestamps: false, // I do not want timestamp fields by default
    },
    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast: (field, next) => { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    // timezone: '+08:00',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587886489418_2212';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  // 加载 errorHandler 中间件
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.validate = {
    convertType: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
