import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as products from "../controllers/productController.js";

const router = express.Router();

router.get("/", authenticateToken, products.getUserProducts);
router.post("/", authenticateToken, products.addProduct);
router.put("/:id", authenticateToken, products.replaceProduct);
router.patch("/:id", authenticateToken, products.updateProduct);
router.delete("/:id", authenticateToken, products.deleteProduct);

export default router;
