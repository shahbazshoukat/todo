const ListHandler = require("../handlers/lists");
class ListManager {
  static async createList(data, userId) {
    try {
        const doc = await ListHandler.createList(data, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getLists(userId) {
    try {
        const doc = await ListHandler.getLists(userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getList(listId, userId) {
    try {
        const doc = await ListHandler.getList(listId, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteList(listId, userId) {
      console.log(listId);
    try {
        const doc = await ListHandler.deleteList(listId, userId);
        console.log(doc);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListManager;
