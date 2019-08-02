const GroupHandler = require("../handlers/groups");
class GroupManager {
  static async createGroup(data, userId) {
    try {
      const doc = await GroupHandler.createGroup(data, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getGroups(userId) {
    try {
      const doc = await GroupHandler.getGroups(userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getGroup(groupId) {
    try {
      const doc = await GroupHandler.getGroup(groupId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteGroup(groupId, userId) {
    try {
      const doc = await GroupHandler.deleteGroup(groupId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async addGroupMember(groupId, userId) {
    try {
      const doc = await GroupHandler.addGroupMember(groupId, userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async removeGroupMember(groupId, memberId) {
    try {
      const doc = await GroupHandler.removeGroupMember(groupId, memberId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GroupManager;
