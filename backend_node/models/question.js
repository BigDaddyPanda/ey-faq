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
    visited: { type: DataTypes.INTEGER, defaultValue: 1 },
    edited: DataTypes.BOOLEAN,
    editedBy: DataTypes.STRING
  }, {});
  question.associate = function (models) {
    // associations can be defined here
    question.belongsTo(models.user, { constraints: false, allowNull: true, defaultValue: null })
    question.belongsTo(models.service, { constraints: false, allowNull: true, defaultValue: null })
    question.hasMany(models.comment, { constraints: false, allowNull: true, defaultValue: null })
    // question.hasMany(models.answer, {
    //   as: 'answers', constraints: false, allowNull: true, defaultValue: null
    // })
    // question.hasMany(models.attachement, {
    //   as: 'attachements', constraints: false, allowNull: true, defaultValue: null
    // })
    // question.hasOne(models.service, { constraints: false, allowNull: true, defaultValue: null })

    // // https://sequelize.readthedocs.io/en/v3/api/associations/belongs-to-many/
    // question.belongsToMany(models.user, {
    //   unique: false,
    //   through:{ model:models.user_question, unique: false }, constraints: false, allowNull: true, defaultValue: null
    // });
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(question)
  return question;
};