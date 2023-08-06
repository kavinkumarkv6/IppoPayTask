import express from "express";
import { create } from "../controller/password.js";

const router = express.Router();

// For Hello world test.
router.get("/", (req, res) => {
  res.send("Hello, World!123");
});

// Store new Password
router.post("/storePassword", create);

export default router;
