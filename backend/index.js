const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000
const connectDB = require('./config/db')
const cors = require('cors')
connectDB()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
}))

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
