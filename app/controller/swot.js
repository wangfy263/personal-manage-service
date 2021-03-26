'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');
// const { Op } = require('sequelize');

// 定义创建接口的请求参数规则
const createRule = {
  goal_name: { type: 'string', required: false },
  login_no: { type: 'string', required: false },
};

class SwotController extends Controller {
  /** 查询列表 */
  async index() {
    const { ctx } = this;
    const condition = {
      where: {},
    };
    const swots = await ctx.model.Swot.findAll(condition);
    const resInfo = new RetInfo('000000', '成功', swots);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async show() {
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.params);
    const expends = await ctx.model.Swot.findByPk(Number(ctx.params.id));
    const resInfo = new RetInfo('000000', '成功', expends);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    ctx.request.body.create_time = Date.now();
    ctx.request.body.update_time = Date.now();
    const { id } = await ctx.model.Swot.create(ctx.request.body);
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
  async update() {
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.request.body);
    const { id } = ctx.request.body;
    ctx.request.body.update_time = Date.now();
    const swot = await this.ctx.model.Swot.findByPk(id);
    if (!swot) {
      ctx.status = 201;
      ctx.body = new RetInfo('-1', 'swot not found');
      return;
    }
    await swot.update(ctx.request.body);
    // 设置响应体和状态码
    ctx.status = 201;
    ctx.body = new RetInfo('000000', '成功', { id });
  }
  async destroy() {
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.request.body);
    const { id } = ctx.request.body;
    const swot = await this.ctx.model.Swot.findByPk(id);
    if (!swot) {
      ctx.status = 201;
      ctx.body = new RetInfo('-1', 'swot not found');
      return;
    }
    await swot.destroy();
    // 设置响应体和状态码
    ctx.status = 201;
    ctx.body = new RetInfo('000000', '成功', { id });
  }
}

module.exports = SwotController;
