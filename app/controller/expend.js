'use strict';

const Controller = require('egg').Controller;
const RetInfo = require('../utils/retInfo');
const { Op } = require('sequelize');

// 定义创建接口的请求参数规则
const createRule = {
  expend_money: 'number',
  expend_time: 'string',
  login_no: { type: 'string', required: false },
  type_level_first: 'string',
  // type_level_first: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false }
  type_level_second: 'string',
  remark: { type: 'string', required: false },
};

class ExpendController extends Controller {
  // 查询支出明细
  async index() {
    const { ctx } = this;
    const condition = {
      where: {},
    };
    // 获取入参
    if (ctx.query.level1Res) {
      condition.where.type_level_first = ctx.query.level1Res;
    }
    if (ctx.query.level2Res) {
      condition.where.type_level_second = ctx.query.level2Res;
    }
    if (ctx.query.startDate && ctx.query.endDate) {
      condition.where.expend_time = {
        [Op.and]: {
          [Op.gt]: new Date(ctx.query.startDate),
          [Op.lt]: new Date(ctx.query.endDate),
        },
      };
    }
    if (ctx.query.remark) {
      condition.where.remark = ctx.query.remark;
    }
    const expends = await ctx.model.Expend.findAll(condition);
    const resInfo = new RetInfo('000000', '成功', expends);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async show() {
    const { ctx } = this;
    ctx.validate({ id: 'Number' }, ctx.params);
    const expends = await ctx.model.Expend.findByPk(Number(ctx.params.id));
    const resInfo = new RetInfo('000000', '成功', expends);
    ctx.status = 200;
    ctx.body = resInfo;
  }
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 expend
    const { detail_id } = await ctx.model.Expend.create(ctx.request.body);
    // 设置响应体和状态码
    const resInfo = new RetInfo('000000', '成功', { id: detail_id });
    ctx.status = 201;
    ctx.body = resInfo;
  }
}

module.exports = ExpendController;

// exports.index = async () => {};

// exports.new = async () => {};

// exports.create = async () => {};

// exports.show = async () => {};

// exports.edit = async () => {};

// exports.update = async () => {};

// exports.destroy = async () => {};
