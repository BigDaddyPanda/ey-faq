'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN,
    editedBy: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
    // associations can be defined here
    // reaction join
    answer.belongsTo(models.user,{ constraints: false, allowNull: true, defaultValue: null })
    answer.belongsTo(models.question,{ constraints: false, allowNull: true, defaultValue: null })
    // answer.belongsToMany(models.user, {

    //   through: { model: models.user_answer, unique: false }, constraints: false, allowNull: true, defaultValue: null
    // });
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(answer)
  return answer;
};