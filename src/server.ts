import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.sync();

        console.log('Database Connected');

        app.listen(PORT, () => {
            console.log(`Server running on chl rha h ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();