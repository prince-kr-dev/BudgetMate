const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const cors = require("cors");


const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local frontend (dev)
      "https://budget-mate-seven.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes")
const profileRoutes = require("./routes/profileRoutes");

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/profile", profileRoutes);


const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is runnning on PORT " + PORT);
    });
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });
