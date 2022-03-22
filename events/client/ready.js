const Logger = require('../../utils/Logger');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    Logger.client("- prêt à être utilisé");

    client.user.setPresence({ activities: [{ name: 'avec /help', type: 'PLAYING' }], status: 'dnd' });

    const devGuild = await client.guilds.cache.get('810091118401552395');
    devGuild.commands.set(client.commands.map(cmd => cmd));
  },
};
