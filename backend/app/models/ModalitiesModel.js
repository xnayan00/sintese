const mongoose = require('mongoose')

const ModalitiesSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('modalities', ModalitiesSchema) 