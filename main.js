const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const { readdirSync, writeFileSync } = require("fs")
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });;
client.config = require("./config");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
require("./util/functions")(client);

//créé le fichier local permettant de se souvenir des gens qui ont déjà été prévenu par rapport au statut et aux pubs

if (!readdirSync(".").includes("bdd_pub.json")) {
    writeFileSync("bdd_pub.json", JSON.stringify({ users: [] }, null, 4));
  }

client.login(client.config.TOKEN);
