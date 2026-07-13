import { NextFunction, Request, Response } from "express";


import authService from "../services/auth.service";

import { successResponse } from "../responses/apiResponse";

import { HTTP_STATUS } from "../constants/httpStatus";
import { changePasswordSchema, refreshTokenSchema, updateProfileSchema, registerSchema, loginSchema, logoutSchema, forgotPasswordSchema, resetPasswordSchema } from "../validations/auth.validation";
import AppError from "../utils/AppError";


class AuthController {
    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};
            const { error } = registerSchema.validate(body);
            if (error) {
                throw new AppError(error.details[0].message, HTTP_STATUS.BAD_REQUEST);
            }
            const data = await authService.registerUser(body);

            return successResponse(
                res,
                "User registered successfully",
                data,
                HTTP_STATUS.CREATED
            );
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body || {};
            const { error } = loginSchema.validate(body);
            if (error) {
                throw new AppError(error.details[0].message, HTTP_STATUS.BAD_REQUEST);
            }
            const data = await authService.loginUser(body);

            return successResponse(
                res,
                "User logged in successfully",
                data,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    }

    async profile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            return successResponse(
                res,
                "Profile fetched successfully",
                req.user,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};
            const { error } = updateProfileSchema.validate(body);

            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const data = await authService.updateProfile(
                req.user!.id,
                body
            );

            return successResponse(
                res,
                "Profile update successfully",
                data,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        };
    }

    async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};
            const { error } = changePasswordSchema.validate(body);
            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const data = await authService.changePassword(
                req.user!.id,
                body.currentPassword,
                body.newPassword
            )
            return successResponse(res, "password changed successfully", data, HTTP_STATUS.OK);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};
            const { error } = refreshTokenSchema.validate(body);
            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }
            const data = await authService.refreshToken(body.refreshToken);

            return successResponse(
                res,
                "Token refreshed successfully",
                data,
                HTTP_STATUS.OK
            );
        } catch (error) {
            next(error);
        }
    }

    async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const body = req.body || {};

            const { error } =
                logoutSchema.validate(body);

            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const data =
                await authService.logout(
                    body.refreshToken
                );

            return successResponse(
                res,
                "Logged out successfully",
                data,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};

            const { error } =
                forgotPasswordSchema.validate(body);

            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const data =
                await authService.forgotPassword(
                    body.email
                );

            return successResponse(
                res,
                "Reset token generated successfully",
                data,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    }

    async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = req.body || {};

            const { error } =
                resetPasswordSchema.validate(body);

            if (error) {
                throw new AppError(
                    error.details[0].message,
                    HTTP_STATUS.BAD_REQUEST
                );
            }

            const data =
                await authService.resetPassword(
                    body.token,
                    body.password
                );

            return successResponse(
                res,
                "Password reset successfully",
                data,
                HTTP_STATUS.OK
            );

        } catch (error) {
            next(error);
        }
    }
}
export default new AuthController();