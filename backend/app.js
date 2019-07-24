const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./models/task");
const List = require("./models/list");
const User = require("./models/user");
const Label = require("./models/label");
const checkAuth = require("./middleware/check-auth");
const app = express();

mongoose
  .connect(
    "mongodb+srv://shahbazshoukat:password009@cluster0-0qyfn.mongodb.net/todoDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//***Sign up API */

app.post("/api/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save().then(createdUser => {
      res.status(201).json({
        message: "User Added Successfully",
        userId: createdUser._id
      });
    });
  });
});

//****Login API */

app.post("/api/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId : fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

app.get("/api/user",checkAuth, (req, res, next) => {
  User.findOne({_id: checkAuth.userData.userId }).then(user => {
    res.status(200).json({
      name:user.name
    })
  })
})

//***Tasks Api */

app.post("/api/tasks", checkAuth, (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    notes: req.body.notes,
    list: req.body.list,
    labels: req.body.label,
    reminder: req.body.reminder,
    userId: req.userData.userId,
    completeStatus: false
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: "Task Added successfully",
      taskId: createdTask._id
    });
  });
});



app.get("/api/tasks", checkAuth, (req, res, next) => {
  Task.find({userId : req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/tasksbylist:list", checkAuth, (req, res, next) => {
  Task.find({list:req.params.list, userId : req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/taskscountbylist:list", checkAuth, (req, res, next) => {
  Task.find({list:req.params.list, userId : req.userData.userId}).count().then(noOfTasks => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      noOfTasks: noOfTasks
    });
  });
});

app.get("/api/taskscountbylabel:label", checkAuth, (req, res, next) => {
  Task.find({label:req.params.label, userId : req.userData.userId}).count().then(noOfTasks => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      noOfTasks: noOfTasks
    });
  });
});


app.get("/api/tasksbylabel:label", checkAuth, (req, res, next) => {
  Task.find({userId : req.userData.userId, labels: req.params.label}).then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/tasks:id", checkAuth, (req, res, next) => {
  Task.findOne({userId : req.userData.userId, _id: req.params.id}).then(documents => {
    res.status(200).json({
      message: "Task fetched successfully!",
      task: documents
    });
  });
});



app.put("/api/tasks/:id",checkAuth, (req, res, next) => {
  const task = new Task({
    _id:req.body.id,
    title: req.body.title,
    notes: req.body.notes,
    list: req.body.list,
    labels: req.body.label,
    reminder: req.body.reminder,
    userId: req.userData.userId,
    completeStatus: false
  });

  Task.updateOne({ _id: req.params.id, userId: req.userData.userId }, task).then(result => {
    res.status(200).json({ message: "Update successful!", "result" : result });
  });
})


app.delete("/api/tasks/:id", checkAuth, (req, res, next) => {

  Task.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Task deleted!" });
  });
});

//*****List API */

app.post("/api/lists",checkAuth, (req, res, next) => {
  const list = new List({
    title: req.body.title,
    userId: req.userData.userId
  });
  list.save().then(createdList => {
    res.status(201).json({
      message: "List Added successfully",
      listId: createdList._id
    });
  });
});
app.get("/api/lists",checkAuth, (req, res, next) => {
  List.find({userId: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Lists fetched successfully!",
      lists: documents
    });
  });
});

app.get("/api/lists:id",checkAuth, (req, res, next) => {
  List.findOne({_id: req.params.id, userId: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "List fetched successfully!",
      lists: documents
    });
  });
});



app.delete("/api/lists/:id", checkAuth, (req, res, next) => {

  List.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(result => {
    console.log(result);
    res.status(200).json({ message: "List deleted!" });
  });
});

//******/Label Api

app.post("/api/labels",checkAuth, (req, res, next) => {
  const label = new Label({
    title: req.body.title,
    userId: req.userData.userId
  });
  label.save().then(createdLabel => {
    res.status(201).json({
      message: "Label Added successfully",
      labelId: createdLabel._id
    });
  });
});
app.get("/api/labels",checkAuth, (req, res, next) => {
  Label.find({userId: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Labels fetched successfully!",
      labels: documents
    });
  });
});

app.get("/api/labels:id",checkAuth, (req, res, next) => {
  Label.findOne({_id: req.params.id, userId: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Label fetched successfully!",
      labels: documents
    });
  });
});

app.delete("/api/labels/:id",checkAuth, (req, res, next) => {
  Label.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Label deleted!" });
  });
});

module.exports = app;
