const Label = require("../models/label");

exports.createLabel = (req, res, next) => {
  const label = new Label({
    title: req.body.title,
    userId: req.userData.userId
  });
  label.save().then(createdLabel => {
    res.status(201).json({
      message: "Label Added successfully",
      labelId: createdLabel._id
    });
  });
};

exports.getLabels = (req, res, next) => {
  Label.find({ userId: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "Labels fetched successfully!",
      labels: documents
    });
  });
};

exports.getLabel = (req, res, next) => {
  Label.findOne({ _id: req.params.id, userId: req.userData.userId }).then(
    documents => {
      res.status(200).json({
        message: "Label fetched successfully!",
        labels: documents
      });
    }
  );
};

exports.deleteLabel = (req, res, next) => {
  Label.deleteOne({ _id: req.params.id, userId: req.userData.userId }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Label deleted!" });
    }
  );
};
