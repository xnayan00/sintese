const mongoose = require('mongoose')

const CountersSchema = new mongoose.Schema(
  {
    students: Number,
    studentsLast30Days: Number,
    teachers: Number,
    teams: Number,
  },
)

module.exports = mongoose.model('counters', CountersSchema)