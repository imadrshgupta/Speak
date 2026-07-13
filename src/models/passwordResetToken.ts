import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";

class PasswordResetToken extends Model { }

PasswordResetToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: "password_reset_tokens",
    }
);

(PasswordResetToken as any).associate = (models: any) => {
    PasswordResetToken.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
}



export default PasswordResetToken;