'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');
// const { Op } = require('sequelize');

// 定义创建接口的请求参数规则
const createRule = {
  target_id: 'number',
  plan_profile: 'string',
  plan_content: 'string',
  plan_start_date: 'string',
  plan_end_date: 'string',
  tasks: 'object',
};

class TargetController extends Controller {
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
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.params);
    const condition = {
      where: {
        plan_id: ctx.params.id,
      },
    };
    const plan = await ctx.model.Plan.findByPk(ctx.params.id);
    const tasks = await ctx.model.Task.findAll(condition);
    const resInfo = new RetInfo('000000', '成功', { plan, tasks });
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    const inParam = ctx.request.body;
    ctx.validate(createRule, inParam);
    inParam.plan_state = 0;
    inParam.create_time = Date.now();
    // 调用 service 创建一个 plan
    const { plan_id } = await ctx.model.Plan.create(inParam);

    // 创建任务列表
    const tasks = inParam.tasks;
    let taskList = [];
    Object.keys(tasks).forEach(item => {
      taskList = taskList.concat(
        tasks[item].map(each => {
          const task = {};
          task.plan_id = plan_id;
          task.task_date = each;
          task.task_content = item;
          task.task_state = 0;
          task.create_time = inParam.create_time;
          return task;
        })
      );
    });
    await ctx.model.Task.bulkCreate(taskList, {
      validate: true,
      fields: [ 'plan_id', 'task_content', 'task_date', 'task_state' ],
    });
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: plan_id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
}

module.exports = TargetController;
