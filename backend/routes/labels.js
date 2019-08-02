const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const LabelsController = require("../controllers/labels");


router.post("/labels", checkAuth, LabelsController.createLabel);

router.get("/labels", checkAuth, LabelsController.getLabels);

router.get("/labels:id", checkAuth, LabelsController.getLabel);

router.delete("/labels/:id", checkAuth, LabelsController.deleteLabel);

module.exports = router;
