'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.TEXT,
    editedBy: DataTypes.STRING,
    edited: DataTypes.BOOLEAN
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.user,{ constraints: false, allowNull: true, defaultValue: null })
    comment.belongsTo(models.post,{ constraints: false, allowNull: true, defaultValue: null })
    // associations can be defined here
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(comment)
  return comment;
};