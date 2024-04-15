import express, { Express, Request, Response } from "express";
import cors from 'cors';
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";
import authRouter from "./routes/authRoutes";
import protectedRouter from "./routes/protectedRoutes";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import User, { UserStatisticsSchema } from "./model/Users.model";
import authMiddleware from "./middleware/Authentication/authMiddleware";


const app: Express = express();
const PORT = 5000;
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));

app.use(express.json());




app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/protected", authMiddleware, protectedRouter);


const DB_username = "ghislainnkundayezu";
const DB_password = "U5gP8OJxqyAFtSk3";
const DB_URL = `mongodb+srv://ghislainnkundayezu:${DB_password}@cluster0.aam2my6.mongodb.net/To-Do-List-db?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_URL)
  .then(result => {
    console.log("Database connected");
    app.listen(PORT, () => {
       console.log("I am listening at PORT ", PORT);
    });
  })
  .catch(error => console.log("Connection to the database failed: ", error.message));







