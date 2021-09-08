import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
const mongoUrl = process.env.MONGO_URI || "";

const initializeDatabase = function (): void {
    mongoose
        .connect(mongoUrl, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.info("Connected To DB");
        })
        .catch((err) => {
            console.error("Mongoose Connection Error : " + err);
        });
};

export default initializeDatabase;