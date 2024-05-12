import path from "node:path";
//
import { Router } from "express";
import multer from "multer";
// Controllers
import CategoryController from "./controllers/CategoryController";
import ProductController from "./controllers/ProductController";
import OrderController from "./controllers/OrderController";

export const router = Router();

// This code snippet configures multer to handle file uploads, specifying the destination directory
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "../..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  })
});

// ------------------------------------------------------------------------------

// List Categories
router.get("/categories", CategoryController.index);

// Create Category
router.post("/categories", CategoryController.store);

// Delete Category
router.delete("/categories/:id", CategoryController.delete);

// ------------------------------------------------------------------------------

// List Products
router.get("/products", ProductController.index);

// Create Product
router.post("/products", upload.single("image"), ProductController.store);

// Get Products by Category
router.get("/categories/:categoryId/products", ProductController.showProducts);

// Delete Product
router.delete("/products/:id", ProductController.delete);

// ------------------------------------------------------------------------------

// List Orders
router.get("/orders", OrderController.index);

// Create Order
router.post("/orders", OrderController.store);

// Change Order Status
router.patch("/orders/:id", OrderController.update);

// Delete/Cancel Order
router.delete("/orders/:id", OrderController.delete);
