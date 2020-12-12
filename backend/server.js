import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import contactRoutes from "./Routes/contactRoutes.js";
import smsRoutes from "./Routes/smsRoutes.js";
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(cors()); //Blocks browser from restricting any data

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/contacts", contactRoutes);
app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
