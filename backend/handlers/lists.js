const List = require("../models/list");

class ListHandler {
  static createList(data, userId) {
    const list = new List({
      title: data.title,
      userId: userId
    });
    return list.save();
  }

  static getLists(userId) {
    const q = { userId: userId };
    return List.find(q)
      .lean()
      .exec();
  }

  static getList(listId, userId) {
    const q = { _id: listId, userId: userId };
    return List.findOne(q)
      .lean()
      .exec();
  }

  static deleteList(listId, userId) {
    const q = { _id: listId, userId: userId };
    console.log(q);
    return List.deleteOne(q);
  }
}

module.exports = ListHandler;
