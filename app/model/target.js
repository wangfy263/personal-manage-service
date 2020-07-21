'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Expend = app.model.define('personal_target', {
    target_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    target_title: STRING(100),
    target_content: STRING(500),
    target_measurable: STRING(500),
    target_time_bound: DATE,
    target_time_bound_real: DATE,
    target_state: INTEGER,
    target_level: INTEGER,
    target_motivation: STRING(500),
    parent_target_id: INTEGER,
    create_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  return Expend;
};
