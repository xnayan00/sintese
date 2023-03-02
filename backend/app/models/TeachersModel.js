const mongoose = require('mongoose')

const TeachersSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    contactIsWpp: Boolean,
    birthday: String,
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('teachers', TeachersSchema) 