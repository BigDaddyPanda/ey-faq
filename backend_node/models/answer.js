'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN
  }, {});
  answer.associate = function (models) {
    // associations can be defined here
    // reaction join
    answer.belongsToMany(models.user, {
      through: models.user_answer
    });
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(answer)
  return answer;
};