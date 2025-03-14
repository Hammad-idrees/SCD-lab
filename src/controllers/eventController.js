const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const event = new Event({ ...req.body, userId: req.user.userId });
  await event.save();
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user.userId }).sort("date");
  res.json(events);
};
