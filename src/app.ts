import express, { NextFunction, Request, Response } from 'express';
const app = express();
import cors from "cors"
import morgan from 'morgan';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from "cookie-parser"

const allowedOrigins = ["http://localhost:3000", "https://donate-something.vercel.app", "https://donate-box-server.vercel.app"];

// const corsConfig = {
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
// }


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.options("*", cors());
// app.use(cors(corsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1', router)

app.get("/", async (req: Request, res: Response) => {
  res.send("Donate box server is available now")
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