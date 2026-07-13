"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: sequelize_1.DataTypes.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED'),
        defaultValue: 'BEGINNER',
    },
    goal: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'users',
    timestamps: true,
});
exports.default = User;
