const Request = require("../models/request");

class RequestHandler {
  static createRequest(data, userId) {
    const request = new Request({
        senderId: userId,
        receiverId: data.receiverId,
        groupId: data.groupId
    });
    return request.save();
  }

  static getRequests(userId) {
    const q = { receiverId: userId };
    return Request.find(q)
      .lean()
      .exec();
  }

  static getRequest(requestId, userId) {
    const q = { _id: requestId, senderId: userId };
    return Request.findOne(q)
      .lean()
      .exec();
  }

  static deleteRequest(requestId) {
    const q = { _id: requestId};
    console.log(q);
    return Request.deleteOne(q);
  }
}

module.exports = RequestHandler;
