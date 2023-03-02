const mongoose = require('mongoose')

const InvoicingsSchema = new mongoose.Schema(
  {
    contributor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "students"
    },
    reference: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "teams"
    },
    price: Number
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('invoicings', InvoicingsSchema)