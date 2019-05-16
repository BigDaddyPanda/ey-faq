'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachement = sequelize.define('attachement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link: DataTypes.STRING
  }, {});
  attachement.associate = function (models) {
    attachement.belongsTo(models.question, { constraints: false, allowNull: true, defaultValue: null });
    // associations can be defined here
  };
  const sequelizePaginate = require('sequelize-paginate');
  sequelizePaginate.paginate(attachement)

  return attachement;
};