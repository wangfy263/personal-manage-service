'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Swot = app.model.define(
    'personal_methodology_swot',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      create_time: DATE,
      update_time: DATE,
      login_no: STRING(50),
      goal_name: STRING(300),
      goal_scope: STRING(500),
      goal_quality: STRING(500),
      goal_time: STRING(500),
      goal_cost: STRING(500),
      Strengths: STRING(500),
      Opportunities: STRING(500),
      Weaknesses: STRING(500),
      Threats: STRING(500),
      strategy_so: STRING(500),
      strategy_wo: STRING(500),
      strategy_st: STRING(500),
      strategy_wt: STRING(500),
      use_scheme: STRING(500),
      stop_scheme: STRING(500),
      Exploit_scheme: STRING(500),
      defense_scheme: STRING(500),
    },
    {
      timestamps: false,
      freezeTableName: true, // Model 对应的表名将与model名相同
    }
  );
  return Swot;
};
