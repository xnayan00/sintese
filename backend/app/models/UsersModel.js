const mongoose = require("mongoose")

var currentDate = new Date()
currentDate.setHours(currentDate.getHours() - 2.7)

const UsersSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        contact: String,
        birthday: Date,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: {
            currentTime: () => currentDate
        }
    }
)

module.exports = mongoose.model("users", UsersSchema)