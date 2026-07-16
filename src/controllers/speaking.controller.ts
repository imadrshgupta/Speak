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
                data, HTTP_STATUS.CREATED
            );

        } catch (error) {
            next(error);
        }
    }

    async history(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await SpeakingService.getHistory(req.user!.id);
            return successResponse(
                res,
                "Speaking history fetched successfully",
                data,
                HTTP_STATUS.OK
            )
        } catch (error) {
            next(error);
        }
    }

    async details(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await SpeakingService.getSessionById(req.user!.id, req.params.id as string);
            return successResponse(res, "session fetched successfully", data, HTTP_STATUS.OK);
        } catch (error) {
            next(error);
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const data = await SpeakingService.deleteSession(req.user!.id, req.params.id as string);
            return successResponse(res, "session fetched successfully", data, HTTP_STATUS.OK);

        } catch (error) {
            next(error);
        }
    }
}

export default new SpeakingController();