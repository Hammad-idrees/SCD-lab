const schedule = require("node-schedule");
const Event = require("../models/Event");

const scheduleReminders = () => {
  Event.find({ reminderTime: { $gte: new Date() } }).then((events) => {
    events.forEach((event) => {
      schedule.scheduleJob(event.reminderTime, () => {
        console.log(`Reminder: ${event.name} is coming up!`);
      });
    });
  });
};

module.exports = scheduleReminders;
