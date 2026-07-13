import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';


class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public level!: string;
  public goal!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM(
        'BEGINNER',
        'INTERMEDIATE',
        'ADVANCED'
      ),
      defaultValue: 'BEGINNER',
    },

    goal: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);


(User as any).associate = ( models: any) => {
  User.hasMany(models.PasswordResetToken, { foreignKey: "user_id", as: "passwordResetTokens" });
  User.hasMany(models.RefreshToken, { foreignKey: "user_id", as: "refreshTokens"});
  User.hasMany(models.SpeakingSession, { foreignKey: "user_id", as: "speakingSessions"});
};

export default User;