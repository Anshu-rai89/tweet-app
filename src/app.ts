import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initializeDatabase from "./config/database";
import api from "./routes"
import { errorHandler } from './middlewares/error'
dotenv.config({ path: ".env" });
const port = process.env.PORT;
//console.log("process.env", process.env);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();



app.use("/api/v1", api);
app.use(errorHandler);

app.listen(port, () => console.info('Server up & Running at', port))

export default app;
