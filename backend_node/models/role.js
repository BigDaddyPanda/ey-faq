'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    designation: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
  };
  
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(role)
  return role;
};