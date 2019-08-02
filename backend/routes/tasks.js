const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const TasksController = require("../controllers/tasks");
/***Tasks Api */

router.post("/tasks", checkAuth, TasksController.createTask );
  
  router.get("/tasks", checkAuth, TasksController.getTasks);
  
  router.get("/tasksbylist:list", checkAuth, TasksController.getTasksByList);
  
  router.get("/taskscountbylist:list", checkAuth, TasksController.getTasksCountByList);
  
  router.get("/taskscountbylabel:label", checkAuth, TasksController.getTasksCountByLabel);
  
  router.get("/tasksbylabel:label", checkAuth, TasksController.getTasksByLabel);
  
  router.get("/tasksbygroup:group", checkAuth, TasksController.getTasksByGroup);
  
  router.get("/tasks:id", checkAuth, TasksController.getTask);
  
  router.put("/tasks/:id", checkAuth, TasksController.updateTask);
  
  router.delete("/tasks/:id", checkAuth, TasksController.deleteTask);
  
  router.delete("/grouptasks/:id", checkAuth, TasksController.deleteGroupTask);
  

  module.exports = router;