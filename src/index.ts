import "reflect-metadata";
import express, { Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import dataSource from "./db/postgres.config";
import authRouter from "./routers/authRouter";

const app: Express = express();

const port = process.env.PORT;
const database = process.env.POSTGRES_DATABASE || "";

app.use(express.json());

dataSource
    .initialize()
    .then(() => {
        console.log(`Connected to ${database} database!`);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`);
});
