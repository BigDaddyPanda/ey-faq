'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_question = sequelize.define('user_question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    participation: DataTypes.STRING
  }, {});
  user_question.associate = function (models) {
    // associations can be defined here
  };
  return user_question;
};