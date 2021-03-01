const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  if (message.author.bot) return;
  
  if (message.channel.id == "812735790357938176" && !message.content.startsWith("?")) {
    message.delete();
    const embed = new MessageEmbed()
      .setTitle(`Nouvelle suggestion! ${message.author.username} (${(message.author.id)})`)
      .setColor("#7FFF00")
      .setDescription(message.content)
      .setFooter("Si vous vous êtes trompé, contactez un modérateur ou un CM.");
    message.channel.send(embed)
      .then(msg => {
        msg.react("👍");
        msg.react("👎");
      });
    return;
  }

  if (message.channel.id == "812757333431550034") {
    if (!message.content.startsWith(";") || !message.content.startsWith("?")) message.delete();
  }

  if (!message.content.startsWith(client.config.PREFIX)) return;
  
  const args = message.content.slice(client.config.PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande.");

  if (
    command.help.adminOnly &&
    !message.member.roles.cache.has("812048872003076096")
  ) {
    return message.reply("Seuls les CM peuvent utiliser cette commande.");
  }

  if (command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${client.config.PREFIX}${command.help.name} ${command.help.usage}\``;

    return message.channel.send(noArgsReply);
  };

  if (command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur.');

  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("tu ne peux pas utiliser cette commande sur cet utilisateur.");

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args);
}