const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    perfil: {
        type: DataTypes.ENUM('Técnico', 'Responsável', 'Administrador'),
        allowNull: false,
        defaultValue: 'Técnico'
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

module.exports = User;