import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import dataSource from "./db/postgres.config";

const app: Express = express();

const port = process.env.PORT;
const database = process.env.POSTGRES_DATABASE || "";

dataSource
    .initialize()
    .then(() => {
        console.log(`Connected to ${database} database!`);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`);
});
