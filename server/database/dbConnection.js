import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./config/config.env" });



console.log({  Mongo_uri : process.env.MONGO_URI})

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_employee_managment",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
