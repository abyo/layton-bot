const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const numberPattern = /\d+/g;
  const channel = message.guild.channels.cache.get(args[1].match(numberPattern).join(""));
  message.channel.messages.fetch(args[0]).then(msg => {
    message.channel.send(`<@${msg.author.id}>, ton message a été redirigé vers le salon -> ${channel}. Si tu ne vois pas le salon, direction #roles.`) 

    const embed = new MessageEmbed()
      .setTitle("Nouvelle redirection!")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setColor("#dc143c")
      .setFooter(`Venant du salon -> ${message.channel.name}`)
      .setDescription(msg.content);
    channel.send(embed);
    msg.delete();
  });

  message.delete();
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.REDIRECT;
