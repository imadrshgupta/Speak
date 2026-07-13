import User from "./user.model";
import RefreshToken from "./refreshToken.model";
import PasswordResetToken from "./passwordResetToken";
import SpeakingSession from "./speakingSesssion.model";

const models : any = {
    User,
    RefreshToken,
    PasswordResetToken,
    SpeakingSession
};

Object.keys(models).forEach((modelName) => {
    if(models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export default models;
