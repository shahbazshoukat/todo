const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUser = (req, res, next) => {
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
  };

  exports.loginUser = (req, res, next) => {
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
          process.env.JWT_KEY,
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
  };

  exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.status(200).json({
        name: user.name,
        email: user.email
      });
    });
  };

  exports.getUsers = (req, res, next) => {
    User.find().then(documents => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: documents
      });
    });
  };