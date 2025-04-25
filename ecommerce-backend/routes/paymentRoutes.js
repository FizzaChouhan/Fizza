import express from "express"
import { processStripePayment } from "../controllers/paymentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/stripe").post(protect, processStripePayment)

export default router
