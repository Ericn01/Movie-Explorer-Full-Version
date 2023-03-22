const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        email: {
            type: String,
            required: [true, "Please add an email adress"],
            unique: true // Don't want to have two of the same email address 
        },
        password: {
            type: String, 
            required: [true, "Please add a password"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);