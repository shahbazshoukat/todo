const GroupManager = require("../managers/groups");

class GroupController {
  static async createGroup(req, res) {
    try {
      const doc = await GroupManager.createGroup(req.body, req.userData.userId);
      res.status(201).json({
        message: "Group Added successfully",
        groupId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getGroups(req, res) {
    try {
      const doc = await GroupManager.getGroups(req.userData.userId);
      res.status(200).json({
        message: "Groups fetched successfully!",
        groups: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getGroup(req, res) {
    try {
      const doc = await GroupManager.getGroup(req.params.id);
      res.status(200).json({
        message: "Group fetched successfully!",
        groups: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteGroup(req, res) {
    try {
      const doc = await GroupManager.deleteGroup(req.params.id, req.userData.userId);
      res.status(200).json({ message: "Group deleted!" });
    } catch (err) {
      console.log(err);
    }
  }
  static async addGroupMember(req, res) {
    try {
      const doc = await GroupManager.addGroupMember(req.body.groupId, req.userData.userId);
      res.status(200).json({
        message: "Member Added successfully!",
        group: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async removeGroupMember(req, res) {
    try {
      const doc = await GroupManager.removeGroupMember(req.body.groupId, req.body.memberId);
      res.status(200).json({
        message: "Member Removed successfully!",
        group: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GroupController;
