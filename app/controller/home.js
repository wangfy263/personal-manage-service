'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');

class CommonController extends Controller {
  async emuns() {
    const { ctx } = this;
    const dicts = await ctx.model.Dictionary.findAll();
    const resInfo = new RetInfo('000000', '成功', dicts);
    ctx.status = 200;
    ctx.body = resInfo;
  }
}

module.exports = CommonController;
