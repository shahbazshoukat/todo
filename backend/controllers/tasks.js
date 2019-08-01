const Task = require("../models/task");

exports.createTask = (req, res, next) => {
    const task = new Task({
      title: req.body.title,
      notes: req.body.notes,
      list: req.body.list,
      labels: req.body.label,
      reminder: req.body.reminder,
      userId: req.userData.userId,
      groupId: req.body.groupId,
      completeStatus: false
    });
    task.save().then(createdTask => {
      res.status(201).json({
        message: "Task Added successfully",
        taskId: createdTask._id
      });
    });
  };

  exports.updateTask = (req, res, next) => {
    Task.updateOne(
      { _id: req.params.id, userId: req.userData.userId },
      {
        title: req.body.title,
        notes: req.body.notes,
        list: req.body.list,
        labels: req.body.label,
        reminder: req.body.reminder
      }
    ).then(result => {
      res.status(200).json({ message: "Update successful!", result: result });
    });
  };

  exports.deleteTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
      result => {
        console.log(result);
        res.status(200).json({ message: "Task deleted!" });
      }
    );
  };

  exports.deleteGroupTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Task deleted!" });
    });
  };

  exports.getTasks = (req, res, next) => {
    Task.find({ userId: req.userData.userId, groupId: null }).then(documents => {
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: documents
      });
    });
  };

  exports.getTask = (req, res, next) => {
    Task.findOne({
      userId: req.userData.userId,
      _id: req.params.id,
      groupId: null
    }).then(documents => {
      res.status(200).json({
        message: "Task fetched successfully!",
        task: documents
      });
    });
  };

  exports.getTasksByList = (req, res, next) => {
    Task.find({
      list: req.params.list,
      userId: req.userData.userId,
      groupId: null
    }).then(documents => {
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: documents
      });
    });
  };

  exports.getTasksByLabel = (req, res, next) => {
    Task.find({
      userId: req.userData.userId,
      labels: req.params.label,
      groupId: null
    }).then(documents => {
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: documents
      });
    });
  };

  exports.getTasksByGroup = (req, res, next) => {
    Task.find({ groupId: req.params.group }).then(documents => {
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: documents
      });
    });
  };

  exports.getTasksCountByList = (req, res, next) => {
    Task.find({
      list: req.params.list,
      userId: req.userData.userId,
      groupId: null
    })
      .count()
      .then(noOfTasks => {
        res.status(200).json({
          message: "Tasks fetched successfully!",
          noOfTasks: noOfTasks
        });
      });
  };

  exports.getTasksCountByLabel = (req, res, next) => {
    Task.find({
      label: req.params.label,
      userId: req.userData.userId,
      groupId: null
    })
      .count()
      .then(noOfTasks => {
        res.status(200).json({
          message: "Tasks fetched successfully!",
          noOfTasks: noOfTasks
        });
      });
  };