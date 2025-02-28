import express from "express";
import connectDB from "./infrastructure/db.js";  
import signin from "./presentation/routes/signin.js";
import signup from "./presentation/routes/signup.js";
import otp from "./presentation/routes/otp.js"; 
import cors from "cors";
import { userMiddleware } from './presentation/middleware/auth.js';
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config({ path: path.resolve("..", ".env") });

const corsOptions = {
    origin: process.env.SITE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // Must be false when using origin: '*'
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Front Page!');
});

app.get('/test', (req, res) => {
    res.send('CORS test successful!');
});



// Use Sign-in Routes
app.use("/api/v1/signin", signin);
app.use("/api/v1/signup", signup);
app.use("/api/v1/otp", otp);

app.get("/api/v1/dashboard", userMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to the dashboard! You are authenticated."
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
