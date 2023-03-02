const mongoose = require('mongoose')

const TeamsSchema = new mongoose.Schema(
  {
    modality: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "modalities"
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "teachers"
    },
    startTime: String,
    endTime: String,
    weekDays: Array,
    status: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('teams', TeamsSchema) 