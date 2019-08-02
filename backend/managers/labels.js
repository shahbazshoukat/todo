const LabelHandler = require("../handlers/labels");
class LabelManager {
  static async createLabel(data, userId) {
    try {
        const doc = await LabelHandler.createLabel(data, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getLabels(userId) {
    try {
        const doc = await LabelHandler.getLabels(userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getLabel(labelId, userId) {
    try {
        const doc = await LabelHandler.getLabel(labelId, userId);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteLabel(labelId, userId) {
    try {
        const doc = await LabelHandler.deleteLabel(labelId, userId);
        console.log(doc);
        return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LabelManager;
