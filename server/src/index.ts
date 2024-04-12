import express, { Express, Request, Response } from "express";
import cors from 'cors';
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";
import authRouter from "./routes/authRoutes";
import protectedRouter from "./routes/protectedRoutes";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";


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
app.use("/api/v1/protected", protectedRouter);

app.get('/cookie', (req, res) => {
  //res.send("Home");
  console.log("Here23...")
   res.cookie("diva", "token", {httpOnly:true, maxAge: 8000, sameSite:'none'});
  return res.json({success:true})
});
// app.post("/api/v1/login", (req: Request, res: Response) => {
//     console.log(req.body);
//     res.status(200).json({
//         success: true, 
//         message: "User Logged In successfully"
//     });
    
// });

// app.post("/api/v1/register", (req: Request, res: Response) => {
//     console.log(req.body);
//     res.status(200).json({
//         success: true, 
//         message: "User Registered In successfully"
//     });
    
// });

// app.get("/", (req, res) => {
//     res.send("Okay")
// })


const DB_username = "ghislainnkundayezu";
const DB_password = "U5gP8OJxqyAFtSk3";
const DB_URL = `mongodb+srv://ghislainnkundayezu:${DB_password}@cluster0.aam2my6.mongodb.net/To-Do-List?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_URL)
  .then(result => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log("I am listening at this ", PORT);
    });
})
  .catch(error => console.log("Connection to the database failed: ", error));


