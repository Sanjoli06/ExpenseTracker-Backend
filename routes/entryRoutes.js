import express from "express";
import { createEntry, getEntries } from "../controllers/entryController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/")
  .post(authMiddleware, createEntry)  // Create new income/expense
  .get(authMiddleware, getEntries);   // Get entries for logged-in user

export default router;
