import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import * as products from "../controllers/productController.js";

const router = express.Router();

// Public
router.get("/", products.getProducts);
router.get("/filter", products.filterProducts); // must stay above "/:id"
router.get("/:id", products.getProductById);

// Protected
router.post("/", authenticateToken, products.addProduct);
router.put("/:id", authenticateToken, products.replaceProduct);
router.patch("/:id", authenticateToken, products.updateProduct);
router.delete("/:id", authenticateToken, products.deleteProduct);
router.delete("/", authenticateToken, products.deleteAllProducts);

export default router;
