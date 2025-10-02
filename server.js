const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); 

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true,              // if sending cookies (optional)
}));

app.use(express.json());

// connect to MongoDB
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
