'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');

// 定义创建接口的请求参数规则
const createRule = {
  subtype_code: 'string',
  subtype_name: 'string',
  name: 'string',
  code: 'string',
  state: 'string',
  note: 'string',
};

const updateRule = {
  subtype_code: { type: 'string', required: false },
  subtype_name: { type: 'string', required: false },
  name: { type: 'string', required: false },
  code: { type: 'string', required: false },
  state: { type: 'string', required: false },
  note: { type: 'string', required: false },
};

class CommonController extends Controller {
  async index() {
    const { ctx } = this;
    // 获取入参
    const condition = {};
    if (ctx.query.state) {
      condition.where.state = ctx.query.state;
    }
    const dicts = await ctx.model.Dictionary.findAll(condition);
    const resInfo = new RetInfo('000000', '成功', dicts);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    ctx.request.body.create_time = new Date();
    // 调用 service 创建一个 expend
    const { detail_id } = await ctx.model.Dictionary.create(ctx.request.body);
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: detail_id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
  async update() {
    const { ctx } = this;
    if (!ctx.params.id) {
      ctx.body = new RetInfo();
    }
    const condition = {
      where: {
        id: ctx.params.id,
      },
    };
    ctx.validate(updateRule, ctx.request.body);
    // 调用 service update 指定对dict
    const { detail_id } = await ctx.model.Dictionary.update(ctx.request.body, condition);
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: detail_id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
}

module.exports = CommonController;
