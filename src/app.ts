import express, { NextFunction, Request, Response } from 'express';
const app = express();
import cors from "cors"
import morgan from 'morgan';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from "cookie-parser"

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.get("/", async (req: Request, res: Response) => {
    res.send("Donate box server is available")
})


app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessage: [{
            path: req.originalUrl,
            message: 'API not found'
        }]
    })
    next()
})


export default app;