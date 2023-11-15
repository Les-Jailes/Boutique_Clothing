import 'dotenv/config'
import mongoose from "mongoose";
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.error(error.message);
        throw new Error("MongoDB connection error");
    }
}

export default connect;