
const RequestManager = require("../managers/requests");

class RequestController {
  static async createRequest(req, res) {
    try {
      const doc = await RequestManager.createRequest(req.body, req.userData.userId);
      res.status(201).json({
        message: "Request Added successfully",
        requestId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getRequests(req, res) {
    try {
      const doc = await RequestManager.getRequests(req.userData.userId);
      console.log(doc);
      res.status(200).json({
        message: "Requests fetched successfully!",
        requests: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getRequest(req, res) {
    try {
      const doc = await RequestManager.getRequest(req.params.id, req.userData.userId);
      res.status(200).json({
        message: "Request fetched successfully!",
        request: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteRequest(req, res) {
    try {
      const doc = await RequestManager.deleteRequest(req.params.id);
      res.status(200).json({ message: "Request deleted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = RequestController;


