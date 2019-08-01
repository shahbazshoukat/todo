const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const labelsController = require("../controllers/labels");


router.post("/labels", checkAuth, labelsController.createLabel);

router.get("/labels", checkAuth, labelsController.getLabels);

router.get("/labels:id", checkAuth, labelsController.getLabel);

router.delete("/labels/:id", checkAuth, labelsController.deleteLabel);

module.exports = router;
