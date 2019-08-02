const Group = require("../models/group");

class GroupHandler {
  static createGroup(data, userId) {
    const group = new Group({
      title: data.title,
      userId: userId
    });
    return group.save();
  }

  static getGroups(userId) {
    const q = {
      $or: [{ userId: userId }, { members: userId }]
    };
    return Group.find(q)
      .lean()
      .exec();
  }

  static getGroup(groupId) {
    const q = { _id: groupId };
    return Group.findOne(q)
      .lean()
      .exec();
  }

  static deleteGroup(groupId, userId) {
    const q = { _id: groupId, userId: userId };
    console.log(q);
    return Group.deleteOne(q);
  }

  static addGroupMember(groupId, userId) {
    const q = { _id: groupId };
    const d = {
      $push: {
        members: userId
      }
    };
    console.log(q, d);
    return Group.updateOne(q, d);
  }

  static removeGroupMember(groupId, memberId) {
    const q = { _id: groupId };
    const d = {
      $pull: {
        members: memberId
      }
    };
    return Group.updateOne(q, d);
  }
}

module.exports = GroupHandler;
