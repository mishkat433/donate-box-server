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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.DATABASE_URL);
            console.log("database connected successfully");
            mongoose_1.default.connection.on("error", (error) => {
                console.log('database connection error', error);
            });
        }
        catch (error) {
            console.log(error);
        }
        process.on('unhandledRejection', (err) => {
            if (server) {
                server.close(() => {
                    console.log(err);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
app_1.default.listen(config_1.default.PORT, () => {
    bootstrap();
    console.log(`Server is running at http://localhost:${config_1.default.PORT}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM is detect, we are closing our server');
    if (server) {
        server.close();
    }
});
