const express = require("express");
const { verify } = require("jsonwebtoken");
const { updateUser, deleteUser, getUser, getUsers } = require("../Controllers/user");
const { verifyAdmin, verifyUser } = require("../Middleware/verifyToken")
const router = express.Router();


//update
router.put("/:id", updateUser);
router.delete("/:id",verifyAdmin, deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);


module.exports = router;