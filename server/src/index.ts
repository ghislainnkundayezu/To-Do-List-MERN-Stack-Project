import express, { Express, Request, Response } from "express";
import cors from 'cors';
import authRouter from "./routes/authRoutes";
import protectedRouter from "./routes/protectedRoutes";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/Authentication/authMiddleware";
import dotenv  from "dotenv";

dotenv.config();     // configure the dotenv file to use environment variables


const app: Express = express();             

const PORT = process.env.PORT || 5000;

app.use(cookieParser());          // middleware that allows our code to intercept cookies sent in requests.

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());          // middleware that allows our code to intercept JSON Data sent in requests.

app.use("/api/v1/auth", authRouter);      // middleware to route all requests related to authentication the authRouter.
app.use("/api/v1/protected", authMiddleware, protectedRouter);    // middleware to route all requests related to protected resources to the protectedRputer.

// The connection url to our mongodb atlas.
const DB_URL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aam2my6.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(DB_URL)
  .then(result => {
    console.log("Database connected");
    app.listen(PORT, () => {
       console.log("I am listening at PORT ", PORT);
    });
  })
  .catch(error => console.log("Connection to the database failed: ", error.message));





