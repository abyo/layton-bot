const { Client, Collection, Intents } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");
const intents = new Intents();
intents.add([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
])
const client = new Client({ partials: ["MESSAGE", "USERS", "GUILD_MEMBER", "CHANNEL", "REACTION"], intents: intents });

client.config = require("./config");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);
