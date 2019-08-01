const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIO = require("socket.io-client")("http://localhost:4200");
const app = express();
const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");
const usersRoutes = require("./routes/users");
const labelsRoutes = require("./routes/labels");
const groupsRoutes = require("./routes/groups");
const requestsRoutes = require("./routes/requests");
mongoose
  .connect(
    "mongodb+srv://shahbazshoukat:" + process.env.MONGO_ATLAS_PW + "@cluster0-0qyfn.mongodb.net/todoDB?retryWrites=true&w=majority"
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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
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



app.use("/api", usersRoutes);

app.use("/api", tasksRoutes);

app.use("/api", listsRoutes);

app.use("/api", labelsRoutes);

app.use("/api", groupsRoutes);

app.use("/api", requestsRoutes);


module.exports = app;
