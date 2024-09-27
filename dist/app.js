"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// import morgan from 'morgan';
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const allowedOrigins = ["http://localhost:3000", "https://donate-something.vercel.app", "https://donate-box-server.vercel.app"];
const corsConfig = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
// CORS Configuration to allow requests from both local and deployed frontend
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://donate-something.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
// }));
// app.options("", cors(corsConfig))
// app.use(cors(corsConfig))
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// app.use(morgan('dev'))
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Donate box server is available now");
}));
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessage: [{
                path: req.originalUrl,
                message: 'API not found'
            }]
    });
    next();
});
exports.default = app;
