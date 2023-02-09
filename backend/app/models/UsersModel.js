const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        contact: String,
        contactIsWpp: Boolean,
        status: {
            type: Boolean,
            default: true
        },
        birthday: Date,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("users", UsersSchema)