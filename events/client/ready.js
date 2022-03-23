const Logger = require("../../utils/Logger");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    Logger.client("- prêt à être utilisé");

    const devGuild = await client.guilds.cache.get("951144271988293663");
    devGuild.commands.set(client.commands.map((cmd) => cmd));
  },
};
