import express, { Express, Request, Response } from "express";
import cors from 'cors';
const app: Express = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


app.post("/api/v1/login", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json({
        success: true, 
        message: "User Logged In successfully"
    });
    
});

app.post("/api/v1/register", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json({
        success: true, 
        message: "User Registered In successfully"
    });
    
});

app.get("/", (req, res) => {
    res.send("Okay")
})

app.listen(PORT, () => {
    console.log("I am listening at this ", PORT);
});