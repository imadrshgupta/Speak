import { HTTP_STATUS } from "../constants/httpStatus";
import SpeakingSession from "../models/speakingSesssion.model";
import AppError from "../utils/AppError";


class SpeakingService {
    async createSession(
        userId: string,
        data: any
    ) {
        const session = await SpeakingSession.create({
            user_id: userId,
            topic: data.topic,
            transcript: data.transcript,
            duration: data.duration,
            status: "PROCESSING"
        });
        return session;
    }

    async getHistory(userId: string) {
        const sessions = await SpeakingSession.findAll({
            where: { user_id: userId, },
            order: [
                ["createdAt", "DESC"]
            ]
        })
        return sessions;
    }

    async getSessionById(
        userId: string,
        sessionId: string
    ) {
        const session = await SpeakingSession.findOne({
            where: { id: sessionId, user_id: userId },
        });
        if (!session) {
            throw new AppError("Speaking Session not found", HTTP_STATUS.NOT_FOUND);
        }

        return session;
    }

    async deleteSession(
        userId: string,
        sessionId: string
    ) {
        const session = await SpeakingSession.findOne({
            where: { id: sessionId, user_id: userId },
        });
        if (!session) {
            throw new AppError("Speaking Session not found", HTTP_STATUS.NOT_FOUND);
        }

        await session.destroy();

        return {
            message: "speakig session deleted successfully",
        };

    }
}

export default new SpeakingService();