const RequestHandler = require("../handlers/requests");
class RequestManager {
  static async createRequest(data, userId) {
    try {
        const doc = await RequestHandler.createRequest(data, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getRequests(userId) {
    try {
        const doc = await RequestHandler.getRequests(userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getRequest(requestId, userId) {
    try {
        const doc = await RequestHandler.getRequest(requestId, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteRequest(requestId) {
    try {
        const doc = await RequestHandler.deleteRequest(requestId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = RequestManager;
