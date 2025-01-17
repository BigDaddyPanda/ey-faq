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
        photo_link: type.STRING,
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


    }, {
            scopes: {
                default: {
                    attributes: { exclude: ['password'] },
                },
                withoutCredentials: {
                    attributes: { exclude: ['password', 'resetPasswordExpires', 'resetPasswordToken', "service", "role"] },
                },
            }
        });
    user.associate = function (models) {
        // associations can be defined here
        user.belongsTo(models.service, { constraints: false, allowNull: true, defaultValue: null });
        user.belongsTo(models.role, { constraints: false, allowNull: true, defaultValue: null });
        // user.hasMany(models.attachement);
        //the post reaction association
        user.hasMany(models.post, { constraints: false, allowNull: true, defaultValue: null });
        user.hasMany(models.answer, { constraints: false, allowNull: true, defaultValue: null });

        user.hasMany(models.answer, { constraints: false, allowNull: true, defaultValue: null });
        user.hasMany(models.comment, { constraints: false, allowNull: true, defaultValue: null });
        // user.belongsToMany(models.post, {
        //     unique: false,
        //     through: { model: models.user_post, unique: false }, constraints: false, allowNull: true, defaultValue: null
        // });
        // user.belongsToMany(models.question, {
        //     unique: false,
        //     through: { model: models.user_question, unique: false }, constraints: false, allowNull: true, defaultValue: null
        // });
    };
    const sequelizePaginate = require('sequelize-paginate');
    sequelizePaginate.paginate(user)

    return user;
}