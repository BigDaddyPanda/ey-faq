'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_comment = sequelize.define('user_comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    participation: DataTypes.STRING
  }, {});
  user_comment.associate = function (models) {
    // associations can be defined here
  };
  return user_comment;
};