import express from "express";
import { createEntry, deleteEntry, getEntries, updateEntry } from "../controllers/entryController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/")
  .post(authMiddleware, createEntry)  
  .get(authMiddleware, getEntries);   

router.route("/:id")
  .delete(authMiddleware, deleteEntry) 
  .put(authMiddleware,updateEntry);     

export default router;
