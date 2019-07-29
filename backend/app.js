const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./models/task");
const List = require("./models/list");
const User = require("./models/user");
const Label = require("./models/label");
const Group = require("./models/group");
const Request = require("./models/request");
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
        userId: fetchedUser._id,
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

app.get("/api/user:id", checkAuth, (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(user => {
    res.status(200).json({
      name: user.name,
      email: user.email
    });
  });
});

app.get("/api/user", checkAuth, (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users: documents
    });
  });
});

//***Tasks Api */

app.post("/api/tasks", checkAuth, (req, res, next) => {
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
});

app.get("/api/tasks", checkAuth, (req, res, next) => {
  Task.find({ userId: req.userData.userId, groupId: null }).then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/tasksbylist:list", checkAuth, (req, res, next) => {
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
});

app.get("/api/taskscountbylist:list", checkAuth, (req, res, next) => {
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
});

app.get("/api/taskscountbylabel:label", checkAuth, (req, res, next) => {
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
});

app.get("/api/tasksbylabel:label", checkAuth, (req, res, next) => {
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
});

app.get("/api/tasksbygroup:group", checkAuth, (req, res, next) => {
  Task.find({ groupId: req.params.group }).then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/tasks:id", checkAuth, (req, res, next) => {
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
});

app.put("/api/tasks/:id", checkAuth, (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    title: req.body.title,
    notes: req.body.notes,
    list: req.body.list,
    labels: req.body.label,
    reminder: req.body.reminder,
    userId: req.userData.userId,
    completeStatus: false
  });

  Task.updateOne(
    { _id: req.params.id, userId: req.userData.userId },
    task
  ).then(result => {
    res.status(200).json({ message: "Update successful!", result: result });
  });
});

app.delete("/api/tasks/:id", checkAuth, (req, res, next) => {
  Task.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Task deleted!" });
    }
  );
});

//*****List API */

app.post("/api/lists", checkAuth, (req, res, next) => {
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
app.get("/api/lists", checkAuth, (req, res, next) => {
  List.find({ userId: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Lists fetched successfully!",
      lists: documents
    });
  });
});

app.get("/api/lists:id", checkAuth, (req, res, next) => {
  List.findOne({ _id: req.params.id, userId: req.userData.userId }).then(
    documents => {
      res.status(200).json({
        message: "List fetched successfully!",
        lists: documents
      });
    }
  );
});

app.delete("/api/lists/:id", checkAuth, (req, res, next) => {
  List.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "List deleted!" });
    }
  );
});

//******/Label Api

app.post("/api/labels", checkAuth, (req, res, next) => {
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
app.get("/api/labels", checkAuth, (req, res, next) => {
  Label.find({ userId: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Labels fetched successfully!",
      labels: documents
    });
  });
});

app.get("/api/labels:id", checkAuth, (req, res, next) => {
  Label.findOne({ _id: req.params.id, userId: req.userData.userId }).then(
    documents => {
      res.status(200).json({
        message: "Label fetched successfully!",
        labels: documents
      });
    }
  );
});

app.delete("/api/labels/:id", checkAuth, (req, res, next) => {
  Label.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Label deleted!" });
    }
  );
});

/*****Group API */

app.post("/api/groups", checkAuth, (req, res, next) => {
  const group = new Group({
    title: req.body.title,
    userId: req.userData.userId
  });
  group.save().then(createdGroup => {
    res.status(201).json({
      message: "Group Added successfully",
      groupId: createdGroup._id
    });
  });
});
app.get("/api/groups", checkAuth, (req, res, next) => {
  Group.find({
    $or: [{ userId: req.userData.userId }, { members: req.userData.userId }]
  }).then(documents => {
    res.status(200).json({
      message: "Groups fetched successfully!",
      groups: documents
    });
  });
});

app.get("/api/groups:id", checkAuth, (req, res, next) => {
  Group.findOne({ _id: req.params.id }).then(documents => {
    res.status(200).json({
      message: "Group fetched successfully!",
      groups: documents
    });
  });
});

app.post("/api/groupmembers", checkAuth, (req, res, next) => {
  Group.updateOne({ _id: req.body.groupId},{
    $push: {
      members:req.userData.userId
    }
  }).then(documents => {
    res.status(200).json({
      message: "Member Added successfully!",
      group: documents
    });
  });
});

app.put("/api/groupmembers", checkAuth, (req, res, next) => {
  Group.updateOne({ _id: req.body.groupId},{
    $pull: {
      members:req.body.memberId
    }
  }).then(documents => {
    res.status(200).json({
      message: "Member Removed successfully!",
      group: documents
    });
  });
});

app.delete("/api/groups/:id", checkAuth, (req, res, next) => {
  Group.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Group deleted!" });
    }
  );
});



//******/Request Api

app.post("/api/requests", checkAuth, (req, res, next) => {
  const request = new Request({
    senderId: req.userData.userId,
    receiverId: req.body.receiverId,
    groupId: req.body.groupId
  });
  request.save().then(createdRequest => {
    res.status(201).json({
      message: "Request Added successfully",
      requestId: createdRequest._id
    });
  });
});
app.get("/api/requests", checkAuth, (req, res, next) => {
  Request.find({ receiverId: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Requests fetched successfully!",
      requests: documents
    });
  });
});

app.get("/api/requests:id", checkAuth, (req, res, next) => {
  Request.findOne({ _id: req.params.id, senderId: req.userData.userId }).then(
    documents => {
      res.status(200).json({
        message: "Request fetched successfully!",
        request: documents
      });
    }
  );
});

app.delete("/api/requests/:id", checkAuth, (req, res, next) => {
  Request.deleteOne({ _id: req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Request deleted!" });
    }
  );
});




module.exports = app;
