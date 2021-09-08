import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initializeDatabase from "@config/database";
const port = process.env.PORT;
dotenv.config();

const app = express();
const api = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();



app.use("/api/v1", api);

app.listen(port, () => console.info('Server up & Running at', port))

export default app;
