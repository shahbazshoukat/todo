const ListManager = require("../managers/lists");

class ListController {
  static async createList(req, res) {
    try {
      const doc = await ListManager.createList(req.body, req.userData.userId);
      res.status(201).json({
        message: "List Added successfully",
        listId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getLists(req, res) {
    try {
      const doc = await ListManager.getLists(req.userData.userId);
      res.status(200).json({
        message: "Lists fetched successfully!",
        lists: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getList(req, res) {
    try {
      const doc = await ListManager.getList(req.params.id, req.userData.userId);
      res.status(200).json({
        message: "List fetched successfully!",
        lists: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteList(req, res) {
    try {
      const doc = await ListManager.deleteList(req.params.id, req.userData.userId);
      res.status(200).json({ message: "List deleted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListController;
