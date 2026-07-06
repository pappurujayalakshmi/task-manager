require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());                  // Allow cross-origin requests from the React client
app.use(express.json());          // Parse incoming JSON request bodies

// Routes
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => res.send("Task Manager API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
