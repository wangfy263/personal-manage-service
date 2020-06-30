'use strict';

module.exports = app => {
  const { validator } = app;
  /**
   * 检测Number 类型
   */
  validator.addRule('Number', (rule, data) => {
    console.log('data', data);
    if (data === '') {
      return 'can not be null';
    }
    data = Number(data);
    if (Number.isNaN(data)) {
      return 'must be Number';
    }

    if (rule.min) {
      if (rule.min > data) {
        return 'must more than ' + rule.min;
      }
    }

    if (rule.max) {
      if (rule.max < data) {
        return 'must less than ' + rule.max;
      }
    }
  });
};
