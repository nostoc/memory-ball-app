const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require("./routes/authRoutes");
const deckRouter = require("./routes/deckRoutes");
const cardRouter = require("./routes/cardRoutes");
const sessionRouter = require("./routes/sessionRoutes");

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Body parser
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"," PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount routers - IMPORTANT: Mount routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/v1/decks", deckRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/sessions", sessionRouter);



// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
