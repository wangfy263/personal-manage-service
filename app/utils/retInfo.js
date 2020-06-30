'use strict';
class RetInfo {
  constructor(code, msg, data) {
    this.retCode = code || '999999';
    this.retMsg = msg || '系统异常，请稍后再试!';
    if (this.retCode === '000000') {
      this.data = data || {};
    } else {
      this.detail = data || 'system error';
    }
  }
}

module.exports = RetInfo;
