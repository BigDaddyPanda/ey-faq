'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
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
  post.associate = function (models) {
    // associations can be defined here
    post.hasMany(models.comment, {as: 'comments'})
    post.hasMany(models.attachement, {as: 'attachements'})
    // https://sequelize.readthedocs.io/en/v3/api/associations/belongs-to-many/
    post.belongsToMany(models.user, {
      through: models.user_post
    });
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(post)

  return post;
};