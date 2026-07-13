import SpeakingSession from "../models/speakingSesssion.model";


class SpeakingService {
    async createSession(
        userId: string,
        data: any
    ){
        const session = await SpeakingSession.create({
            user_id: userId,
            topics: data.transcript,
            duration: data.duration,
            status: "PROCESSING"
        });
        return session;
    }

    async getHistory(
        userId: string
    ){

    }

    async getSession(
        userId: string,
        sessionId: string
    ){
        
    }
}

export default new SpeakingService();