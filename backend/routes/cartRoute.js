import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as cart from "../controllers/cartController.js";

const router = express.Router();

router.use(authenticateToken);
router.get("/", cart.getCart);
router.post("/", cart.addToCart);
router.delete("/:productId", cart.removeFromCart);

export default router;
