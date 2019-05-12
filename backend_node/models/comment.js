'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(comment)
  return comment;
};