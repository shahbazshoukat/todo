const express = require("express");
const Group = require("../models/group");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const GroupController = require("../controllers/groups");

router.post("/groups", checkAuth, GroupController.createGroup);

router.get("/groups", checkAuth, GroupController.getGroups);

router.get("/groups:id", checkAuth, GroupController.getGroup);

router.post("/groupmembers", checkAuth, GroupController.addGroupMember);

router.put("/groupmembers", checkAuth, GroupController.removeGroupMember);

router.delete("/groups/:id", checkAuth, GroupController.deleteGroup);

module.exports = router;
