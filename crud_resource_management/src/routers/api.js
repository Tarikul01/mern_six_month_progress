const express = require("express");
const router = express.Router();
const ResourceController = require("../controllers/ResourceController");

// Read Product
router.post("/add-resource", ResourceController.CreateResource);

// Create Product
router.post("/update-resource/:id", ResourceController.UpdateResource);

// Update products
router.get("/read-resource", ResourceController.ReadResource);

//Read By id
router.get("/read-resource/:id",ResourceController.ReadResourceById)

// Delete Product
router.get("/delete-resource/:id", ResourceController.DeleteResource);

module.exports = router;
