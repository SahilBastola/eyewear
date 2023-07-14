const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
} = require("../Controllers/product");

const router = express.Router();
router.put("/:id", updateProduct);
router.post("/createhostel", createProduct);
router.get("/", getAllProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);





module.exports = router;
