const express = require("express");
const userController = require("./controller.user");

const router = express.Router();
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser)
router.get("/user", userController.getAllUser)
router.delete("/delete/:id", userController.deletedUser)
router.patch("/update/:id", userController.updateUser)

module.exports = router;