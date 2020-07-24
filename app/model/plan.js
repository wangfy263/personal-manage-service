'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Plan = app.model.define('personal_target_plan', {
    plan_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    target_id: INTEGER,
    plan_profile: STRING(500),
    plan_content: STRING(500),
    plan_start_date: DATE,
    plan_end_date: DATE,
    plan_type: INTEGER,
    plan_state: INTEGER,
    plan_summarize: STRING(500),
    create_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  return Plan;
};
