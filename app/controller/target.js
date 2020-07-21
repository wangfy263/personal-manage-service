'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');
// const { Op } = require('sequelize');

// 定义创建接口的请求参数规则
const createRule = {
  target_title: 'string',
  target_content: 'string',
  login_no: { type: 'string', required: false },
  target_measurable: 'string',
  target_motivation: 'string',
  // type_level_first: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false }
  target_time_bound: 'string',
  target_time_bound_real: { type: 'string', required: false },
  target_state: { type: 'number', values: [ 0, 1 ], required: false },
  parent_target_id: { type: 'number', required: false },
};

class TargetController extends Controller {
  // 查询支出明细
  async index() {
    const { ctx } = this;
    const condition = {
      where: {},
    };
    const targets = await ctx.model.Target.findAll(condition);
    const resInfo = new RetInfo('000000', '成功', targets);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async show() {
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.params);
    const targets = await ctx.model.Target.findByPk(ctx.params.id);
    const resInfo = new RetInfo('000000', '成功', targets);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    const inParam = ctx.request.body;
    ctx.validate(createRule, inParam);
    if (!inParam.parent_target_id) {
      inParam.target_level = 0;
      inParam.parent_target_id = 0;
    } else {
      const targets = await ctx.model.Target.findByPk(inParam.parent_target_id);
      inParam.target_level = targets.target_level + 1;
    }
    inParam.target_state = 0;
    inParam.create_time = Date.now();
    // 调用 service 创建一个 expend
    const { target_id } = await ctx.model.Target.create(inParam);
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: target_id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
}

module.exports = TargetController;

// exports.index = async () => {};

// exports.new = async () => {};

// exports.create = async () => {};

// exports.show = async () => {};

// exports.edit = async () => {};

// exports.update = async () => {};

// exports.destroy = async () => {};
