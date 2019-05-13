/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       first_name:
 *         type: string
 *       last_name:
 *         type: integer
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       resetPasswordToken:
 *         type: string
 *       resetPasswordExpires:
 *         type: string
 *         format: date-time
 *       required:
 *         - email
 *         - username
 *         - password
 */

module.exports = (sequelize, type) => {
    const user = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: type.STRING,
        last_name: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false,
        },
        username: {
            type: type.STRING,
            allowNull: false,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        resetPasswordToken: type.STRING,
        resetPasswordExpires: type.DATE,
    });
    user.associate = function (models) {
        // associations can be defined here
        user.belongsTo(models.service);
        user.belongsTo(models.role);
        user.hasMany(models.attachement);
        //the post reaction association
        user.belongsToMany(models.post, {
            through: models.user_post
        });
    };
    const sequelizePaginate = require('sequelize-paginate');
    sequelizePaginate.paginate(user)
    return user;
}