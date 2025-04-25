
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import 'colors';


// // Route imports
// import productRoutes from "./routes/productRoutes.js"
// import userRoutes from "./routes/userRoutes.js"
// import orderRoutes from "./routes/orderRoutes.js"
// import uploadRoutes from "./routes/uploadRoutes.js"
// import paymentRoutes from "./routes/paymentRoutes.js"

// dotenv.config()

// // Connect to MongoDB
// connectDB()

// const app = express()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname =path.__dirname(__filename);
// // Middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"))
// }

// app.use(cors())
// app.use(express.json())

// // API Routes
// app.use("/api/products", productRoutes)
// app.use("/api/users", userRoutes)
// app.use("/api/orders", orderRoutes)
// app.use("/api/upload", uploadRoutes)
// app.use("/api/payment", paymentRoutes)

// // Get PayPal client ID
// app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// // Get Stripe publishable key
// app.get("/api/config/stripe", (req, res) => res.send(process.env.STRIPE_PUBLISHABLE_KEY))

// // Make uploads folder static
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// // Error handling middleware

// app.use(express.static(path.join(__dirname,"/ecommerce-frontend/dist")))
// app.get('*',(_,res)=>{
// res.sendFile(path.resolve(__dirname,"ecommerce-frontend","dist","index.html"));
// })

// app.use(notFound)
// app.use(errorHandler)
// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
// })
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import 'colors';

// Route imports
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Define __filename and __dirname correctly for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(cors())
app.use(express.json())

// API Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/payment", paymentRoutes)

// Get PayPal client ID
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Get Stripe publishable key
app.get("/api/config/stripe", (req, res) => res.send(process.env.STRIPE_PUBLISHABLE_KEY))

// Make uploads folder static
app.use("/uploads", express.static(path.resolve(__dirname, "/uploads")))

// Error handling middleware
app.use(express.static(path.join(__dirname,"../ecommerce-frontend/dist")))
// app.get('*',(_, res) => {
//   res.sendFile(path.resolve(__dirname,"ecommerce-frontend","dist","index.html"));
// })
app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, "ecommerce-frontend", "dist", "index.html"));
});

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})
