const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsController");

// Read Product
router.get("/ReadProduct", ProductController.ReadProducts);

// Create Product
router.post("/CreateProduct", ProductController.CreateProduct);

// Update products
router.post("/UpdateProduct/:id", ProductController.UpdateProduct);

// Delete Product
router.get("/DeleteProduct/:id", ProductController.DeleteProduct);

module.exports = router;
