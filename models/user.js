const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
module.exports = User;
