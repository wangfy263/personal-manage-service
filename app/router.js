'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const path = require('path');

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/personal/emuns', controller.home.emuns);
  // router.get('/allExpends', controller.expend.findAllExpend);
  router.resources('expends', '/api/personal/expends', controller.expend);

  // 加载所有的校验规则
  const validate = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(validate, 'validate');
};
