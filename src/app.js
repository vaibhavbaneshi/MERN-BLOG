import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
// import { ApiError } from '../src/utils/ApiError.js';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// app.use((err, req, res, next) => {
//     if (err instanceof ApiError) {
//       res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//         data: err.data,
//         errors: err.errors,

//     });
    
//     } else {
//       // Handle other types of errors
//       res.status(500).json({
//         success: false,
//         message: 'Internal Server Error',
//         error: err.message,
//       });
//     }
//   });

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(statusCode).json({
//       statusCode,
//       success: false,
//       message,
//     });
//   });

export {app}