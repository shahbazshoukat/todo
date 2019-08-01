const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const tasksController = require("../controllers/tasks");
/***Tasks Api */

router.post("/tasks", checkAuth, tasksController.createTask );
  
  router.get("/tasks", checkAuth, tasksController.getTasks);
  
  router.get("/tasksbylist:list", checkAuth, tasksController.getTasksByList);
  
  router.get("/taskscountbylist:list", checkAuth, tasksController.getTasksCountByList);
  
  router.get("/taskscountbylabel:label", checkAuth, tasksController.getTasksCountByLabel);
  
  router.get("/tasksbylabel:label", checkAuth, tasksController.getTasksByLabel);
  
  router.get("/tasksbygroup:group", checkAuth, tasksController.getTasksByGroup);
  
  router.get("/tasks:id", checkAuth, tasksController.getTask);
  
  router.put("/tasks/:id", checkAuth, tasksController.updateTask);
  
  router.delete("/tasks/:id", checkAuth, tasksController.deleteTask);
  
  router.delete("/grouptasks/:id", checkAuth, tasksController.deleteGroupTask);
  

  module.exports = router;