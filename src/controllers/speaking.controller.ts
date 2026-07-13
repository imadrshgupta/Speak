import { Request, Response, NextFunction, } from "express";
import SpeakingService from "../services/Speaking.service";
import { successResponse } from "../responses/apiResponse";
import { HTTP_STATUS } from "../constants/httpStatus";
import AppError from "../utils/AppError";
import { createSpeakingSessionSchema } from "../validations/speaking.validation";


class SpeakingController {
    async createSession(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const body = req.body || {};

            const { error } = createSpeakingSessionSchema.validate(body);

            if (error) {
                throw new AppError(
                    error.details[0].message, HTTP_STATUS.BAD_REQUEST
                )
            }

            const data = await SpeakingService.createSession(
                req.user!.id,
                body
            );
             
            return successResponse(
                res, " Speaking session created successfully",
                data,HTTP_STATUS.CREATED
            );

        } catch (error) {
            next(error);
        }
    }

    async history(
        req: Request,
        res: Response,
        next: NextFunction,
    ) { }

    async details(
        req: Request,
        res: Response,
        next: NextFunction,
    ) { }
}

export default new SpeakingController();