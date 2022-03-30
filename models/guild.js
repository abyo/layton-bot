const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  id: String,
  logChannel: { type: String, default: "946367142478098482" },
  modChannel: { type: String, default: "950771860931493919" },
  users: { type: [], default: [] },
  faq: { type: [], default: [] },
});

module.exports = mongoose.model("Guild", guildSchema);
