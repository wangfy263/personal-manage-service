'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const path = require('path');

module.exports = app => {
  const { router, controller } = app;
  // router.get('/api/personal/emuns', controller.dictionary.emuns);
  router.resources('dictionary', '/api/personal/dictionarys', controller.dictionary);
  router.resources('expend', '/api/personal/expends', controller.expend);
  router.resources('target', '/api/personal/targets', controller.target);
  router.resources('plan', '/api/personal/plans', controller.plan);
  router.resources('task', '/api/personal/tasks', controller.task);

  // 加载所有的校验规则
  const validate = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(validate, 'validate');
};
