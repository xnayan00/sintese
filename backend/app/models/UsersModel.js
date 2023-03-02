const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      contact: String,
      contactIsWpp: Boolean,
      birthday: Date,
      status: {
          type: Boolean,
          default: true
      },
    },
    {
      timestamps: true
    }
)

module.exports = mongoose.model("users", UsersSchema)