'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_post = sequelize.define('user_post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    participation: DataTypes.STRING
  }, {});
  user_post.associate = function(models) {
    // associations can be defined here
  };
  return user_post;
};