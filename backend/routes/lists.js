const express = require("express");
const List = require("../models/list");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const listsController = require("../controllers/lists");



router.post("/lists", checkAuth, listsController.createList);
  router.get("/lists", checkAuth, listsController.getLists);
  
  router.get("/lists:id", checkAuth, listsController.getList);
  
  router.delete("/lists/:id", checkAuth, listsController.deleteList);


module.exports = router;