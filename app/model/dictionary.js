'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Dictionary = app.model.define('personal_data_dictionary', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    subtype_code: STRING(36),
    subtype_name: STRING(50),
    name: STRING(50),
    code: STRING(36),
    note: STRING(255),
    state: STRING(36),
    create_time: DATE,
    update_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  return Dictionary;
};
