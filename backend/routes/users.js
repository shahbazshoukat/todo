const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UsersController = require("../controllers/users");

router.post("/signup", UsersController.createUser);

router.post("/login", UsersController.loginUser);

router.post("/forgotpassword", UsersController.findUserByEmail);

router.put("/resetpassword", UsersController.resetPassword);

router.get("/user:id", checkAuth, UsersController.getUser);

router.get("/user", checkAuth, UsersController.getUsers);

module.exports = router;
