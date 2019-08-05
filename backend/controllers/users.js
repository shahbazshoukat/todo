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
    try {
      const doc = await UserManager.loginUser(req.body);
      res.json(doc);
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
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
