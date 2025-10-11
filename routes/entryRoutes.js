import express from "express";
import { createEntry, deleteEntry, getEntries, updateEntry } from "../controllers/entryController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/")
  .post(authMiddleware, createEntry)  // Create new income/expense
  .get(authMiddleware, getEntries);   // Get entries for logged-in user

router.route("/:id")
  .delete(authMiddleware, deleteEntry)  // delete entry
  .put(authMiddleware,updateEntry);     // edit entry

export default router;
