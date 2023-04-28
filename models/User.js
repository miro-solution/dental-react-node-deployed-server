const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  access_token: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
  },
  address: {
    type: String,
  },
  about_me: {
    type: String,
  },
  subscriber: {
    type: Boolean,
  },
  url: {
    type: String,
  },
  timezone: {
    type: String,
  },
  availability: {
    days: {
      Monday: { type: Boolean, default: true },
      Tuesday: { type: Boolean, default: true },
      Wednesday: { type: Boolean, default: true },
      Thursday: { type: Boolean, default: true },
      Friday: { type: Boolean, default: true },
      Saturday: { type: Boolean, default: false },
      Sunday: { type: Boolean, default: false },
    },
    hours: {
      end: String,
      start: String,
    },
  },
  calendars: {
    type: Array,
  },
  // meetings: [{ duration: Number, meetingName: String }],
  meetings: [
    {
      color: { type: String },
      dentist: { type: Schema.Types.ObjectId, ref: 'Dentist' },
      duration: { type: Number },
      repeat: { type: Number },
      startDate: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      endDate: { type: String },
      meetingName: { type: String },
      expiredTime: { type: Number },
      allDay: { type: Boolean },
      days: {
        monday: { type: Boolean, default: true },
        tuesday: { type: Boolean, default: true },
        wednesday: { type: Boolean, default: true },
        thursday: { type: Boolean, default: true },
        friday: { type: Boolean, default: true },
        saturday: { type: Boolean, default: false },
        sunday: { type: Boolean, default: false },
      },
    },
  ],
  role: {
    type: String,
    default: 'user',
  },
  verificationCode: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
