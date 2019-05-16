'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    ispublic: { type: DataTypes.BOOLEAN, defaultValue: true },
    tag: { type: DataTypes.STRING, defaultValue: "pending" },
    visited: { type: DataTypes.INTEGER, defaultValue: 1 },
    edited: DataTypes.BOOLEAN,
    editedBy: DataTypes.STRING
  }, {});
  question.associate = function (models) {
    question.belongsTo(models.user, { constraints: false, allowNull: true, defaultValue: null })
    question.belongsTo(models.service, { constraints: false, allowNull: true, defaultValue: null })
    question.hasMany(models.answer, { constraints: false, allowNull: true, defaultValue: null })
    question.hasMany(models.attachement, { constraints: false, allowNull: true, defaultValue: null })

  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(question)
  return question;
};