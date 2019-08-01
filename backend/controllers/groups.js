const Group = require("../models/group");


exports.createGroup = (req, res, next) => {
  const group = new Group({
    title: req.body.title,
    userId: req.userData.userId
  });
  group.save().then(createdGroup => {
    res.status(201).json({
      message: "Group Added successfully",
      groupId: createdGroup._id
    });
  });
};

exports.getGroups = (req, res, next) => {
  Group.find({
    $or: [{ userId: req.userData.userId }, { members: req.userData.userId }]
  }).then(documents => {
    res.status(200).json({
      message: "Groups fetched successfully!",
      groups: documents
    });
  });
};

exports.getGroup =  (req, res, next) => {
  Group.findOne({ _id: req.params.id }).then(documents => {
    res.status(200).json({
      message: "Group fetched successfully!",
      groups: documents
    });
  });
};

exports.addGroupMember = (req, res, next) => {
  Group.updateOne(
    { _id: req.body.groupId },
    {
      $push: {
        members: req.userData.userId
      }
    }
  ).then(documents => {
    res.status(200).json({
      message: "Member Added successfully!",
      group: documents
    });
  });
};

exports.removeGroupMember =  (req, res, next) => {
  Group.updateOne(
    { _id: req.body.groupId },
    {
      $pull: {
        members: req.body.memberId
      }
    }
  ).then(documents => {
    res.status(200).json({
      message: "Member Removed successfully!",
      group: documents
    });
  });
};

exports.deleteGroup =  (req, res, next) => {
  Group.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Group deleted!" });
    }
  );
};


