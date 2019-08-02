const Task = require("../models/task");

class TaskHandler {
  static createTask(data, userId) {
    const task = new Task({
      title: data.title,
      notes: data.notes,
      list: data.list,
      labels: data.label,
      reminder: data.reminder,
      userId: userId,
      groupId: data.groupId,
      completeStatus: false
    });
    return task.save();
  }
  static updateTask(data, userId, taskId) {
    const q = { _id: taskId, userId: userId };
    const task = {
      title: data.title,
      notes: data.notes,
      list: data.list,
      labels: data.label,
      reminder: data.reminder
    };
    return Task.updateOne(q, task);
  }
  static deleteTask(taskId, userId) {
    const q = { _id: taskId, userId: userId };
    return Task.deleteOne(q);
  }
  static deleteGroupTask(taskId) {
    const q = { _id: taskId };
    return Task.deleteOne(q);
  }
  static getTasks(userId) {
    const q = { userId: userId, groupId: null };
    return Task.find(q);
  }
  static getTask(taskId, userId) {
    const q = {
      userId: userId,
      _id: taskId,
      groupId: null
    };
    return Task.findOne(q);
  }
  static getTasksByList(listId, userId) {
    const q = {
      list: listId,
      userId: userId,
      groupId: null
    };
    return Task.find(q);
  }
  static getTasksByLabel(labelId, userId) {
    const q = {
      userId: userId,
      labels: labelId,
      groupId: null
    };
    return Task.find(q);
  }
  static getTasksByGroup(groupId) {
    const q = { groupId: groupId };
    return Task.find(q).lean().exec();
  }
  static getTasksCountByList(listId, userId) {
    const q = {
      list: listId,
      userId: userId,
      groupId: null
    };
    return Task.find(q).count();
  }
  static getTasksCountByLabel(labelId, userId) {
    const q = {
      label: labelId,
      userId: userId,
      groupId: null
    };
    return Task.find().count();
  }
}

module.exports = TaskHandler;
