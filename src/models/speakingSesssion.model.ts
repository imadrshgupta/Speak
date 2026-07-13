import {
    DataTypes,
    Model
} from "sequelize";

import { sequelize } from "../config/database";
import  User from "./user.model";

class SpeakingSession extends Model { }

SpeakingSession.init(
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

        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        transcript: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                "PROCESSING",
                "COMPLETED",
                "FAILED"
            ),
            defaultValue: "PROCESSING",
        },
    },
    {
        sequelize,
        tableName: "speaking_sessions",
    }
);


(SpeakingSession as any).associate = (models: any) => {
    SpeakingSession.belongsTo(models.User, { foreignKey: "user_id", as: "user"});
};

export default SpeakingSession;