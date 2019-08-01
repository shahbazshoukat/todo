const express = require("express");
const Group = require("../models/group");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const groupController = require("../controllers/groups");

router.post("/groups", checkAuth, groupController.createGroup);

router.get("/groups", checkAuth, groupController.getGroups);

router.get("/groups:id", checkAuth, groupController.getGroup);

router.post("/groupmembers", checkAuth, groupController.addGroupMember);

router.put("/groupmembers", checkAuth, groupController.removeGroupMember);

router.delete("/groups/:id", checkAuth, groupController.deleteGroup);

module.exports = router;
