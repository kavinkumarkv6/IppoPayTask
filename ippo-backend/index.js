import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./app/router/routes.js";
import cors from "cors";

// For Server Configure
const app = express();
const port = 3000; // You can change this to any port you prefer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router); // now use the routes to our server

//For database Configure
const connectString = "mongodb://127.0.0.1:27017/ippoPay";
mongoose.Promise = global.Promise;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(connectString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });
