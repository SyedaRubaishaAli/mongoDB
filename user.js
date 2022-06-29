const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  access: { type: Boolean },
});

const userDataModel = mongoose.model("users", userSchema);

module.exports = userDataModel;
