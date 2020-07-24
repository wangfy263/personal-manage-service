'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Task = app.model.define('personal_target_task', {
    task_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    plan_id: INTEGER,
    task_content: STRING(500),
    task_date: DATE,
    task_state: INTEGER,
    task_img: STRING(500),
    task_type: INTEGER,
    create_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  return Task;
};
