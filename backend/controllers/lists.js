
const List = require("../models/list");


//*****List API */

exports.createList = (req, res, next) => {
    const list = new List({
      title: req.body.title,
      userId: req.userData.userId
    });
    list.save().then(createdList => {
      res.status(201).json({
        message: "List Added successfully",
        listId: createdList._id
      });
    });
  }

  exports.getLists = (req, res, next) => {
    List.find({ userId: req.userData.userId }).then(documents => {
      res.status(200).json({
        message: "Lists fetched successfully!",
        lists: documents
      });
    });
  };

  exports.getList =  (req, res, next) => {
    List.findOne({ _id: req.params.id, userId: req.userData.userId }).then(
      documents => {
        res.status(200).json({
          message: "List fetched successfully!",
          lists: documents
        });
      }
    );
  };

  exports.deleteList = (req, res, next) => {
    List.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
      result => {
        console.log(result);
        res.status(200).json({ message: "List deleted!" });
      }
    );
  };


