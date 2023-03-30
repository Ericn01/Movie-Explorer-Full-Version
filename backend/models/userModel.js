const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
        id: {
            type: Number, 
            unique: true,
        },
        details: {
            type: Object,
            firstname: String,
            lastname: String,
            city: String,
            country: String,
        },
        picture: {
            type: Object,
            required: [false],
            large: String,
            thumbnail: String
        },
        membership: {
            type: Object,
            date_joined: String,
            'last-update': String,
            likes: Number
        },
        email: {
            type: String,
            required: [true, "Please add an email adress"],
            unique: true // Don't want to have two of the same email address 
        },
        password_bcrypt: {
            type: String, 
            required: [true, "Please add a password"]
        },
        apikey: {
            type: String,
        },
        favorites: {
            type: Array,
            required: [false]
        }
    }
);

userSchema.methods.isValidPassword = async function (formPassword){
    const user = this; // The schema that we're accessing
    const hash = user.password_bcrypt;
    const validate = await bcrypt.compare(formPassword, hash);
    return validate;
};

module.exports = mongoose.model("User", userSchema, 'users');

