const { Client, Collection, Intents } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");
const { readdirSync, writeFileSync } = require("fs");
const intents = new Intents(Intents.ALL);
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  ws: { intents: intents },
});
client.config = require("./config");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);
require("./util/functions")(client);

if (!readdirSync(".").includes("bdd_pub.json")) {
  writeFileSync("bdd_pub.json", JSON.stringify({ users: [] }, null, 4));
}

client.login(client.config.TOKEN);
