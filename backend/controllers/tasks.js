const Task = require("../models/task");
const TaskManager = require("../managers/tasks");

class TaskController {
  static async createTask(req, res) {
    try {
      const doc = await TaskManager.createTask(req.body, req.userData.userId);
      res.status(201).json({
        message: "Task Added successfully",
        taskId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async updateTask(req, res) {
    try {
      const doc = await TaskManager.updateTask(req.body, req.userData.userId, req.params.id);
      res.status(200).json({ message: "Update successful!", result: doc });
    } catch (err) {
      console.log(err);
    }
  };
  static async deleteTask(req, res) {
    try {
      const doc = await TaskManager.deleteTask(req.params.id, req.userData.userId);
      res.status(200).json({ message: "Task deleted!" });
    } catch (err) {
      console.log(err);
    }
  };
  static async deleteGroupTask(req, res) {
    try {
      const doc = await TaskManager.deleteGroupTask(req.params.id);
      res.status(200).json({ message: "Task deleted!" });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasks(req, res) {
    try {
      const doc = await TaskManager.getTasks(req.userData.userId);
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: doc
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTask(req, res) {
    try {
      const doc = await TaskManager.getTask(req.params.id, req.userData.userId);
      res.status(200).json({
        message: "Task fetched successfully!",
        task: doc
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasksByList(req, res) {
    const doc = await TaskManager.getTasksByList(req.params.list, req.userData.userId);
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: doc
    });
    try {
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasksByLabel(req, res) {
    try {
      const doc = await TaskManager.getTasksByLabel(
        req.params.label,
        req.userData.userId
      );
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: doc
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasksByGroup(req, res) {
    try {
      const doc = await TaskManager.getTasksByGroup(req.params.group);
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: doc
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasksCountByList(req, res) {
    try {
      const doc = await TaskManager.getTasksCountByList(req.params.list, req.userData.userId);
      res.status(200).json({
        message: "Tasks fetched successfully!",
        noOfTasks: doc
      });
    } catch (err) {
      console.log(err);
    }
  };
  static async getTasksCountByLabel(req, res) {
    try {
      const doc = await TaskManager.getTasksCountByLabel(req.params.label, req.userData.userId);
      res.status(200).json({
        message: "Tasks fetched successfully!",
        noOfTasks: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
};


module.exports = TaskController;