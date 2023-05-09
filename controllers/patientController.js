const Dentist = require('../models/Dentist');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const getAllDentists = async (req, res) => {
  try {
    const allDentists = await Dentist.find({});
    res.status(200).json({ docs: allDentists });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
const getAllSchedule = async (req, res) => {
  try {
    const allAppointments = await Appointment.find({});
    res.status(200).json({ docs: allAppointments });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
const getAllUsersMeetings = async (req, res) => {
  try {
    const allMeetings = [];
    const users = await User.find({});
    console.log(users);
    users.map((user) => {
      return allMeetings.push(...user.meetings);
    });
    res.status(200).json({ docs: allMeetings });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

module.exports = {
  getAllDentists,
  getAllSchedule,
  getAllUsersMeetings,
};
