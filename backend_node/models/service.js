'use strict';
module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    designation: DataTypes.STRING
  }, {});
  service.associate = function (models) {
    // associations can be defined here
    service.hasMany(models.user, { constraints: false, allowNull: true, defaultValue: null })
    service.hasMany(models.question, { constraints: false, allowNull: true, defaultValue: null })
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(service)
  return service;
};