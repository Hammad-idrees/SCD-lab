const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/", authMiddleware, getEvents);

module.exports = router;
