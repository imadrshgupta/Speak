import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET!,
        {
            expiresIn: "15m"
        }
    );
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "30d" }
    );
}

export const verifyRefreshToken = (
    token: string
) => {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET!
    );
};

export const verifyAccessToken = (
    token: string
) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    );
};