import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js" 
// import { ApiError } from '../src/utils/ApiError.js';
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      statusCode,
      success: false,
      message,
    });
  });

export {app}