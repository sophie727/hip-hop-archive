const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  about_me: String,
  pfp: String,
  email: String,
  incomingfrqs: Array,
  outgoingfrqs: Array,
  friends: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
