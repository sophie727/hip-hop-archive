const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  creator_name: String,
  creator_googleid: String,
  event_name: String,
  event_start_date: Date, // date and time
  event_end_date: Date, // date and time
  event_location: String,
  event_description: String,
  event_id: String,
  event_image: String,
  event_price: String,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);
