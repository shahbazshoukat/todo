const Label = require("../models/label");

class LabelHandler {
  static createLabel(data, userId) {
    const label = new Label({
      title: data.title,
      userId: userId
    });
    return label.save();
  }

  static getLabels(userId) {
    const q = { userId: userId };
    return Label.find(q)
      .lean()
      .exec();
  }

  static getLabel(labelId, userId) {
    const q = { _id: labelId, userId: userId };
    return Label.findOne(q)
      .lean()
      .exec();
  }

  static deleteLabel(labelId, userId) {
    const q = { _id: labelId, userId: userId };
    console.log(q);
    return Label.deleteOne(q);
  }
}

module.exports = LabelHandler;
