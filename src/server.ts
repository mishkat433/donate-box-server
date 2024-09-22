import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './config';


process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});

let server: Server;


async function bootstrap() {
    try {
        await mongoose.connect(config.DATABASE_URL as string)

        console.log("database connected successfully");

        mongoose.connection.on("error", (error) => {
            console.log('database connection error', error);
        })
    }
    catch (error) {
        console.log(error);
    }

    process.on('unhandledRejection', (err) => {
        if (server) {
            server.close(() => {
                console.log(err);
            })
        }
        else {
            process.exit(1)
        }
    })
}


app.listen(config.PORT, () => {
    bootstrap();
    console.log(`Server is running at http://localhost:${config.PORT}`);
})


process.on('SIGTERM', () => {
    console.log('SIGTERM is detect, we are closing our server');
    if (server) {
        server.close();
    }
});