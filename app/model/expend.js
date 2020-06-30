'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Expend = app.model.define('personal_expend_detail', {
    detail_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    expend_money: STRING(50),
    expend_time: DATE,
    create_time: DATE,
    update_time: DATE,
    login_no: STRING(50),
    type_level_first: STRING(50),
    type_level_second: STRING(50),
    remark: STRING(200),
  }, {
    timestamps: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  return Expend;
};
