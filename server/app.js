import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js"

const app = express();

config({ path: "./config/config.env" });
dbConnection();


app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user", userRoute);






console.log(process.env.PORT)



app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});





export default app;
