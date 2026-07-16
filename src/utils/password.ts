import bcrypt from "bcryptjs";

export const hashPassword = async (password: string | number) => {
    return bcrypt.hash(String(password), 10);
};

export const comparePassword = async (
    password: string | number,
    hashedPassword: string
) => {
    return bcrypt.compare(String(password), hashedPassword);
};

