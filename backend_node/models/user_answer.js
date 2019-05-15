'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_answer = sequelize.define('user_answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    participation: DataTypes.STRING
  }, {});
  user_answer.associate = function (models) {
    // associations can be defined here
  };
  return user_answer;
};