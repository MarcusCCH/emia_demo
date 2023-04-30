const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Pet = require("./Pet");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  sessionNumber: {
    type: Number,
    default: 0,
  },
  favouritePet: {
    type: Number,
    default: null,
  },
  petsData: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
