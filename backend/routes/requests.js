const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const requestControllers = require("../controllers/requests");

router.post("/requests", checkAuth, requestControllers.createRequest);

router.get("/requests", checkAuth, requestControllers.getRequests);

router.get("/requests:id", checkAuth, requestControllers.getRequest);

router.delete("/requests/:id", checkAuth, requestControllers.deleteRequest);

module.exports = router;
