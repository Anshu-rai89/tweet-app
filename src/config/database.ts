import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URI || "";

const initializeDatabase = function (): void {
    mongoose
        .connect(mongoUrl, {
            //@ts-ignore
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.info("Connected To DB");
        })
        .catch((err) => {
            console.error("Mongoose Connection Error : " + err);
        });
};

export default initializeDatabase;