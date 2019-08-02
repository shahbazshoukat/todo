const express = require("express");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ListsController = require("../controllers/lists");



router.post("/lists", checkAuth, ListsController.createList);
  router.get("/lists", checkAuth, ListsController.getLists);
  
  router.get("/lists:id", checkAuth, ListsController.getList);
  
  router.delete("/lists/:id", checkAuth, ListsController.deleteList);


module.exports = router;