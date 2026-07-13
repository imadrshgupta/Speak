"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
class AuthService {
    async registerUser(data) {
        const { name, email, password, level, goal } = data;
        //check if email already exists
        const existingUser = await user_model_1.default.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new Error("Email already exists");
        }
        //hashed password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        //Create user
        const user = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            level,
            goal,
        });
        //generate jwt
        const token = (0, jwt_1.generateToken)(user.getDataValue("id"));
        //Return response
        return {
            user,
            token,
        };
    }
}
exports.default = new AuthService();
