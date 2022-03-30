const Logger = require("../../utils/Logger");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    Logger.client("- prêt à être utilisé");

    client.user.setPresence({
      activities: [{ name: "with /help", type: "PLAYING" }],
      status: "dnd",
    });
    const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
    devGuild.commands.set(client.commands.map((cmd) => cmd));
  },
};
