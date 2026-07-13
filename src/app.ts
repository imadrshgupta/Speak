import express from 'express';
import cors from 'cors';

import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from './middleware/error.middleware';
import speakingRoutes from './routes/speaking.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/speaking", speakingRoutes);


app.use(errorMiddleware);

app.get('/', (_, res) => {
  res.send('SpeakAI API Running');
});

export default app;
