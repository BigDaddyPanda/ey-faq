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
    visited: { type: DataTypes.INTEGER, defaultValue: 1 },
    edited: DataTypes.BOOLEAN,
    editedBy: DataTypes.STRING
  }, {});
  post.associate = function (models) {
    // associations can be defined here
    post.belongsTo(models.user, { constraints: false, allowNull: true, defaultValue: null })
    post.belongsTo(models.service, { constraints: false, allowNull: true, defaultValue: null })
    post.hasMany(models.comment, { constraints: false, allowNull: true, defaultValue: null })

    // https://sequelize.readthedocs.io/en/v3/api/associations/belongs-to-many/
    // post.hasMany(models.attachement, { as: 'attachements' })
    // post.belongsToMany(models.user, {

    //   through: { model: models.user_post, unique: false }, constraints: false
    // });
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(post)

  return post;
};