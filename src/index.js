import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js';
import userRoute from "./routes/user.route.js"

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB()
.then(() => {

    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is listening at port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Database Connection Error!!!", error);
})

app.use('/api/user', userRoute)