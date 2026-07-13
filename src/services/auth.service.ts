import User from "../models/user.model";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import AppError from "../utils/AppError";
import { HTTP_STATUS } from "../constants/httpStatus";
import RefreshToken from "../models/refreshToken.model";
import PasswordResetToken from "../models/passwordResetToken";
import crypto from "crypto";

class AuthService {
    async registerUser(data: RegisterUserDto) {
        const { name, email, password, level, goal } = data;

        //check if email already exists
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new AppError(
                "Email already exists",
                HTTP_STATUS.CONFLICT
            );
        }
        //hashed password
        const hashedPassword = await hashPassword(password);

        //Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            level,
            goal,
        });

        //generate jwt
        const userId = user.getDataValue("id");
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        const userData = user.toJSON();

        delete userData.password;

        //Return response
        return {
            user: userData,
            accessToken,
            refreshToken,
        };
    }

    async loginUser(data: LoginUserDto) {
        const { email, password } = data;

        const user = await User.findOne({
            where: { email }
        })

        if (user == null) {
            throw new AppError(
                "Invalid email or password",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const isPasswordCorrect = await comparePassword(
            password,
            user.getDataValue("password")
        );

        if (!isPasswordCorrect) {
            throw new AppError(
                "Invalid email or password",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const userId = user.getDataValue("id");
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        await RefreshToken.create({
            user_id: userId,
            token: refreshToken,
            expires_at: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )
        })

        const userData = user.toJSON();
        delete userData.password;

        return {
            user: userData,
            accessToken,
            refreshToken,
        };
    }

    async updateProfile(userId: string, data: any) {

        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(
                "user not found",
                HTTP_STATUS.NOT_FOUND
            )
        }

        await user.update(data);

        const userData = user.toJSON();

        delete userData.password;

        return userData;

    }

    async changePassword(
        userId: string,
        currentPassword: string,
        newPassword: string
    ) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new AppError(
                "User not found",
                HTTP_STATUS.NOT_FOUND
            );
        }
        const isPasswordCorrect = await comparePassword(
            currentPassword,
            user.getDataValue("password")
        );
        if (!isPasswordCorrect) {
            throw new AppError(
                "New password cannot be same as current password",
                HTTP_STATUS.BAD_REQUEST
            )
        }

        if (currentPassword === newPassword) {
            throw new AppError(
                "New password cannot be same as current passwor",
                HTTP_STATUS.BAD_REQUEST
            );
        }
        const hashedPassword = await hashPassword(newPassword);

        await user.update({
            password: hashedPassword
        })
        return {
            message: "Password changed successfully"
        };
    }

    async refreshToken(
        refreshToken: string
    ) {
        const decoded = verifyRefreshToken(
            refreshToken
        ) as { id: string };

        const storedToken = await RefreshToken.findOne({
            where: {
                token: refreshToken,
                is_revoked: false
            }
        });

        if (!storedToken) {
            throw new AppError(
                "Invalid or revoked refresh token",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new AppError(
                "User not found",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const accessToken = generateAccessToken(decoded.id);

        return {
            accessToken
        };
    }

    async logout(refreshToken: string) {

        const storedToken = await RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });

        if (!storedToken) {
            throw new AppError(
                "Refresh token not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        await storedToken.update({
            is_revoked: true
        });

        return {
            message: "Logged out successfully"
        };
    }

    async forgotPassword(email: string) {

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError(
                "User not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        await PasswordResetToken.create({
            user_id: user.getDataValue("id"),
            token: resetToken,
            expires_at: new Date(
                Date.now() + 15 * 60 * 1000
            ), // 15 minutes
        });

        return {
            resetToken,
        };
    }

    async resetPassword(
        token: string,
        password: string
    ) {

        const resetRecord =
            await PasswordResetToken.findOne({
                where: {
                    token,
                    used: false,
                },
            });

        if (!resetRecord) {
            throw new AppError(
                "Invalid reset token",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        if (
            new Date() >
            resetRecord.getDataValue("expires_at")
        ) {
            throw new AppError(
                "Reset token expired",
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const user = await User.findByPk(
            resetRecord.getDataValue("user_id")
        );

        if (!user) {
            throw new AppError(
                "User not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        const hashedPassword =
            await hashPassword(password);

        await user.update({
            password: hashedPassword,
        });

        await resetRecord.update({
            used: true,
        });

        return {
            message:
                "Password reset successfully",
        };
    }
}


export default new AuthService();