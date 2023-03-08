const mongoose = require('mongoose')

const OutgoingsSchema = new mongoose.Schema(
  {
    type: Number,
    description: String,
    price: Number,
    customReceiver: String,
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      refPath: 'receiverModel'
    },
    team: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "teams"
    },
    receiverModel: {
      type: String,
      enum: ['Teachers', 'Users']
    }
  },
  {
    timestamps: true
  }
)

mongoose.model('Teachers', new mongoose.Schema({ _id: mongoose.SchemaTypes.ObjectId }));
mongoose.model('Users', new mongoose.Schema({ _id: mongoose.SchemaTypes.ObjectId }));

module.exports = mongoose.model('outgoings', OutgoingsSchema)