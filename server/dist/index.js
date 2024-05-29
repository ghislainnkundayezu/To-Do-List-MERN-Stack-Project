"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authMiddleware_1 = __importDefault(require("./middleware/Authentication/authMiddleware"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config(); // configure the dotenv file to use environment variables
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use((0, cookie_parser_1.default)()); // middleware that allows our code to intercept cookies sent in requests.
app.use(express_1.default.json()); // middleware that allows our code to intercept JSON Data sent in requests.
// serve the build files from the react app.
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use("/api/v1/auth", authRoutes_1.default); // middleware to route all requests related to authentication the authRouter.
app.use("/api/v1/protected", authMiddleware_1.default, protectedRoutes_1.default); // middleware to route all requests related to protected resources to the protectedRputer.
// serve the index.html file to handle client side routing.
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist', 'index.html'));
});
const server = app.listen(PORT, () => {
    console.log("I am listening at PORT ", PORT);
    const { address, port } = server.address();
    console.log(`Server running on ${address}:${port}`);
});
// Start the connection to the database.
(0, db_1.default)();
