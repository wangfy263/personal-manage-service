'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');
// const { Op } = require('sequelize');

// 定义创建接口的请求参数规则
const createRule = {
  // target_id: 'number',
  // plan_profile: 'string',
  // plan_content: 'string',
  // plan_start_date: 'string',
  // plan_end_date: 'string',
  // tasks: 'object',
};

const updateRule = {
  task_state: { type: 'enum', values: [0, 1], required: false },
};

class TaskController extends Controller {
  // 查询支出明细
  async index() {
    // const { ctx } = this;
    // const condition = {
    //   where: {},
    // };
    // const targets = await ctx.model.Target.findAll(condition);
    // const resInfo = new RetInfo('000000', '成功', targets);
    // ctx.status = 200;
    // ctx.body = resInfo;
  }
  async show() {
    // const { ctx } = this;
    // ctx.validate({ id: 'Number' }, ctx.params);
    // const resInfo = new RetInfo('000000', '成功', {});
    // ctx.status = 200;
    // ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    const inParam = ctx.request.body;
    ctx.validate(createRule, inParam);
    inParam.task_state = 0;
    inParam.create_time = Date.now();
    // 调用 service 创建一个 task
    const { task_id } = await ctx.model.Task.create(inParam);

    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: task_id });
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
        task_id: ctx.params.id,
      },
    };
    ctx.validate(updateRule, ctx.request.body);
    const { task_id } = await ctx.model.Task.update(ctx.request.body, condition);
    const resInfo = new RetInfo('000000', '成功', { task_id });
    ctx.status = 200;
    ctx.body = resInfo;
  }
}

module.exports = TaskController;
