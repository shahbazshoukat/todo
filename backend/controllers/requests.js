const Request = require("../models/request");

exports.createRequest =  (req, res, next) => {
    const request = new Request({
      senderId: req.userData.userId,
      receiverId: req.body.receiverId,
      groupId: req.body.groupId
    });
    request.save().then(createdRequest => {
      res.status(201).json({
        message: "Request Added successfully",
        requestId: createdRequest._id
      });
    });
  };

  exports.getRequests =  (req, res, next) => {
    Request.find({ receiverId: req.userData.userId }).then(documents => {
      res.status(200).json({
        message: "Requests fetched successfully!",
        requests: documents
      });
    });
  };
  
  exports.getRequest =  (req, res, next) => {
    Request.findOne({ _id: req.params.id, senderId: req.userData.userId }).then(
      documents => {
        res.status(200).json({
          message: "Request fetched successfully!",
          request: documents
        });
      }
    );
  };

  exports.deleteRequest =  (req, res, next) => {
    Request.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Request deleted!" });
    });
  };

