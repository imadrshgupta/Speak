"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const apiResponse_1 = require("../responses/apiResponse");
const httpStatus_1 = require("../constants/httpStatus");
const auth_validation_1 = require("../validations/auth.validation");
class AuthController {
    async register(req, res) {
        try {
            //Valid request
            const { error } = auth_validation_1.registerSchema.validate(req.body);
            if (error) {
                return (0, apiResponse_1.errorResponse)(res, error.details[0].message, httpStatus_1.HTTP_STATUS.BAD_REQUEST);
            }
            const data = await auth_service_1.default.registerUser(req.body);
            return (0, apiResponse_1.successResponse)(res, "User registered successfully", data, httpStatus_1.HTTP_STATUS.CREATED);
        }
        catch (err) {
            return (0, apiResponse_1.errorResponse)(res, err.message, httpStatus_1.HTTP_STATUS.BAD_REQUEST);
        }
    }
}
exports.default = new AuthController();
