const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userTz: {
    type: String,
    required: true,
  },
  guestFirstName: {
    type: String,
    required: true,
  },
  guestLastName: {
    type: String,
    required: true,
  },
  guestBirthday: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  guestComment: {
    type: String,
  },
  guestTz: {
    type: String,
    required: true,
  },
  meetingName: {
    type: String,
    required: true,
  },
  meetTime: {
    type: Number,
    required: true,
  },
  apptTime: {
    type: Date,
    required: true,
  },
  googleId: {
    type: String,
  },
  dentistId: { type: Schema.Types.ObjectId, required: true },
  // eventSchedule: { type: Schema.Types.ObjectId, ref: 'AppointmentType', required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
