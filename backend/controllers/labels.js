const LabelManager = require("../managers/labels");

class LabelController {
  static async createLabel(req, res) {
    try {
      const doc = await LabelManager.createLabel(req.body, req.userData.userId);
      res.status(201).json({
        message: "Label Added successfully",
        labelId: doc._id
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getLabels(req, res) {
    try {
      const doc = await LabelManager.getLabels(req.userData.userId);
      res.status(200).json({
        message: "Labels fetched successfully!",
        labels: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getLabel(req, res) {
    try {
      const doc = await LabelManager.getLabel(req.params.id, req.userData.userId);
      res.status(200).json({
        message: "Label fetched successfully!",
        labels: doc
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteLabel(req, res) {
    try {
      const doc = await LabelManager.deleteLabel(req.params.id, req.userData.userId);
      res.status(200).json({ message: "Label deleted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LabelController;
