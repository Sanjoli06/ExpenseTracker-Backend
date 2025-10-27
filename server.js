import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();
const app = express();

// app.use(cors({
//   origin: "https://expensetracker-frontend-c3xt.onrender.com",
//   credentials: true,
// }));

app.use(cors());



app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
