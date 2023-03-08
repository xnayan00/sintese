const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    contactIsWpp: Boolean,
    parent: {
      name: String,
      contact: String
    },
    birthday: String,
    status: {
      type: Boolean,
      default: true
    },
    teams: [
      {
        teamId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "teams"
        },
        currency: Number,
        dueDate: String
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('students', StudentsSchema) 