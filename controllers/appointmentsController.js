const Appointment = require('../models/Appointment');
const AppointmentType = require('../models/AppointmentType');
const User = require('../models/User');
const moment = require('moment-timezone');

const SendEmail = require('../config/sendEmail');

const create = async (req, res) => {
  const {
    userId,
    guestFirstName,
    guestLastName,
    guestContactAddress,
    meetingName,
    meetDate,
    apptTime,
    dentistId,
    guestBirthday,
  } = req.body;

  try {
    const newAppointment = new Appointment({
      user: userId,
      guestFirstName: guestFirstName,
      guestLastName: guestLastName,
      guestBirthday: guestBirthday,
      guestContactAddress: guestContactAddress,
      meetingName: meetingName,
      meetDate: meetDate,
      apptTime: apptTime,
      dentistId: dentistId,
    });

    await newAppointment.save();

    res.status(201).send('New event created');
  } catch (err) {
    res.status(400).json(err);
  }
};

const cancel = async (req, res) => {
  try {
    const apt = await Appointment.findOne({ _id: req.params.id });
    apt.delete();
    res.status(200).send('deleted');
  } catch (err) {
    console.error(err);
  }
};

const userIndex = async (req, res) => {
  try {
    const resp = await Appointment.find({ user: req.params.user_id }).populate('dentist');
    console.log('upcoming');
    //sort resp by apptTime
    resp.sort((a, b) => {
      return a.apptTime - b.apptTime;
    });
    const parsed = { upcoming: {}, past: {} };
    const curr = moment().tz(req.query.timezone).format();
    for (const appt of resp) {
      const time = moment(appt.apptTime);
      if (time.isAfter(curr)) {
        if (parsed.upcoming[time.format('MMDDYYYY')]) {
          parsed.upcoming[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.upcoming[time.format('MMDDYYYY')] = [appt];
        }
      } else {
        if (parsed.past[time.format('MMDDYYYY')]) {
          parsed.past[time.format('MMDDYYYY')].push(appt);
        } else {
          parsed.past[time.format('MMDDYYYY')] = [appt];
        }
      }
    }
    res.status(200).json(parsed);
  } catch (err) {
    res.status(400).json({ Error: 'User does not exist' });
  }
};

const userIndexForScheduleView = async (req, res) => {
  try {
    const resp = await Appointment.find({ user: req.params.user_id }).populate('dentist');

    //sort resp by apptTime
    resp.sort((a, b) => {
      return a.apptTime - b.apptTime;
    });

    res.status(200).json(resp);
  } catch (err) {
    res.status(400).json({ Error: 'User does not exist' });
  }
};

const readAppointmentTypes = async (req, res) => {
  const subscribe = req.query.subscribe;
  try {
    if (subscribe === 'a') {
      const allAppointmentTypes = await AppointmentType.find({});
      res.status(200).send({ docs: allAppointmentTypes });
    } else if (subscribe === 't') {
      const allAppointmentTypes = await AppointmentType.find({ subscribe: true });
      res.status(200).send({ docs: allAppointmentTypes });
    } else if (subscribe === 'f') {
      const allAppointmentTypes = await AppointmentType.find({ subscribe: false });
      res.status(200).send({ docs: allAppointmentTypes });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const createAppointmentType = async (req, res) => {
  const newAppointmentType = AppointmentType(req.body);
  try {
    await newAppointmentType.save();

    res.status(201).json({ message: 'New AppointmentType Created', doc: newAppointmentType });
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateAppointmentType = async (req, res) => {
  try {
    const update = await AppointmentType.findByIdAndUpdate(
      { _id: req.params._id, subscribe: req.body.subscribe, title: req.body.title },
      { new: true },
    );
    res.status(200).json({ doc: update });
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteAppointmentType = async (req, res) => {
  try {
    await AppointmentType.findByIdAndRemove({ _id: req.params._id });
    res.status(200).send('Success in delete');
  } catch (err) {
    res.status(400).json(err);
  }
};

const blockSchedules = async (req, res) => {
  const userId = req.body.dentistId;
  const scheduleIds = req.body.schduleIds ? req.body.schduleIds : [];
  const content = req.body.content;
  const Sender = await User.findOne({ _id: userId });
  const queryPromises = scheduleIds.map((id) => {
    const A = Appointment.findOne({ _id: id })
      .exec()
      .then((res) => {
        return { name: res.guestFirstName, email: res.guestEmail };
      });
    return A;
  });
  const recipients = await Promise.all(queryPromises);

  const subject = `Cancelled Schedule`;

  const query = { _id: { $in: scheduleIds } };
  const templateId = '46ad4818b89153e76347eac8355ab9d8';
  try {
    await SendEmail.sendEmailUsingSendPulse(recipients, subject, content, templateId);
    await Appointment.deleteMany(query);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json();
  }
};

module.exports = {
  create,
  userIndex,
  cancel,
  readAppointmentTypes,
  createAppointmentType,
  updateAppointmentType,
  deleteAppointmentType,
  userIndexForScheduleView,
  blockSchedules,
};
