const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dentistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      requied: true,
    },
    email: { type: String, required: true },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  },
);

const Dentist = mongoose.model('Dentist', dentistSchema);

module.exports = Dentist;
