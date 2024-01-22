import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                w: "majority",
                j: true,
                wtimeout: 1000
            }
        });

        console.log(`\nMONGODB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;
