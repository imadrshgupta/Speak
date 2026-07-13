import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"
import User from "./user.model";

class RefreshToken extends Model {}

RefreshToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        token: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },

        is_revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "refresh_tokens"
    }
);

export default RefreshToken;

(RefreshToken as any).associate = (models: any) => {
RefreshToken.belongsTo(models.User, { foreignKey: "user_id", as: "user"});
};