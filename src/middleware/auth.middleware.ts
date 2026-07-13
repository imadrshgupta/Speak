import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { verifyAccessToken } from "../utils/jwt";
import User from "../models/user.model";


export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authheader = req.headers.authorization;
    if (!authheader) {
        throw new AppError(
            "Access denied. No token provided.",
            HTTP_STATUS.UNAUTHORIZED
        )
    }

    const token = authheader.split(" ")[1];

    const decoded = verifyAccessToken(token) as { id: string };

    const user = await User.findByPk(decoded.id);

    if (!user) {
        throw new AppError(
            "user not found",
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    req.user ={
        id: user.id,
        email: user.email,
        level: user.level
    }
    next();

}