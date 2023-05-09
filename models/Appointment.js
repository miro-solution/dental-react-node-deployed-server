const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  guestContactAddress: {
    type: String,
  },
  meetingName: {
    type: String,
    required: true,
  },
  meetDate: {
    type: Date,
    required: true,
  },
  apptTime: {
    type: String,
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
