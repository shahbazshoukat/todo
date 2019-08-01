const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const usersController = require("../controllers/users");



router.post("/signup", usersController.createUser);
  
  router.post("/login", usersController.loginUser);
  
  router.get("/user:id", checkAuth, usersController.getUser );
  
  router.get("/user", checkAuth, usersController.getUsers);

module.exports = router;