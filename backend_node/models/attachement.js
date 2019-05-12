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
    // associations can be defined here
  };
  return attachement;
};