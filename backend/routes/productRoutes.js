import express from "express";
import { deleteProduct, createProduct, fetchProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Server is Ready");
});

router.post("/", createProduct);

router.delete("/:id",deleteProduct );

router.get("/", fetchProducts);

router.put("/:id",updateProduct );

export default router;
