const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentTypeSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    subscribe: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  },
);

const AppointmentType = mongoose.model('AppointmentType', appointmentTypeSchema);

module.exports = AppointmentType;
