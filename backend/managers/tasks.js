const TaskHandler = require("../handlers/tasks");

class TaskManager {
  static async createTask(data, userId) {
    try {
      const doc = await TaskHandler.createTask(data, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateTask(data, userId, taskId) {
    try {
      const doc = await TaskHandler.updateTask(data, userId, taskId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteTask(taskId, userId) {
    try {
      const doc = await TaskHandler.deleteTask(taskId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteGroupTask(taskId) {
    try {
      const doc = await TaskHandler.deleteGroupTask(taskId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasks(userId) {
    try {
      const doc = await TaskHandler.getTasks(userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTask(taskId, userId) {
    try {
      const doc = await TaskHandler.getTask(taskId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasksByList(listId, userId) {
    try {
      const doc = await TaskHandler.getTasksByList(listId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasksByLabel(labelId, userId) {
    try {
      const doc = await TaskHandler.getTasksByLabel(labelId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasksByGroup(groupId) {
    try {
      const doc = await TaskHandler.getTasksByGroup(groupId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasksCountByList(listId, userId) {
    try {
      const doc = await TaskHandler.getTasksCountByList(listId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getTasksCountByLabel(labelId, userId) {
    try {
      const doc = await TaskHandler.getTasksCountByLabel(labelId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TaskManager;
