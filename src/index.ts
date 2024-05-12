import path from "node:path";
//
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
// routes
import { router } from "./app/router";

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    const port = 3001;
    const app = express();

    app.use((request, response, next) => {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Methods", "*");
      response.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

    app.use(express.json());

    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/`);
    });

    // After Middlewares
    /* eslint-disable */
    app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
      console.log(error);

      response.sendStatus(500);
    })

    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });
