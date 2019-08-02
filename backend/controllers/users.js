const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserManager = require("../managers/users");

class UserController {
  static async createUser(req, res) {
    try {
      const doc = await UserManager.createUser(req.body);
      res.status(201).json({
        message: "User Added Successfully",
        userId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async loginUser(req, res) {
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
  }

  static async getUsers(req, res) {
    try {
      const doc = await UserManager.getUsers();
      res.status(200).json({
        message: "Users fetched successfully!",
        users: doc
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getUser(req, res) {
    try {
      const doc = await UserManager.getUser(req.params.id);
      res.status(200).json({
        name: doc.name,
        email: doc.email
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
