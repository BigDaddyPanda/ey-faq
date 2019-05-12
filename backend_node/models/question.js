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
    visited: DataTypes.INTEGER
  }, {});
  question.associate = function (models) {
    // associations can be defined here
    question.hasMany(models.answer, {
      as: 'answers'
    })
    question.hasMany(models.attachement, {
      as: 'attachements'
    }) 

    // https://sequelize.readthedocs.io/en/v3/api/associations/belongs-to-many/
    question.belongsToMany(models.user, {
      through: models.user_question
    });
  };
  return question;
};