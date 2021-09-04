const { Client, Collection, Intents } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");
const intents = new Intents(Intents.ALL);
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], ws: { intents: intents }});

client.config = require("./config");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);
