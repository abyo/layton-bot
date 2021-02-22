const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

const isFirstCharNumeric = c => /\d/.test(c);

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  let raison = args[1];
  
  if (!raison) return message.reply("Indiquer une raison!");

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Reporté", value: user.username, inline: true },
      { name: "Lien du message", value: isFirstCharNumeric(raison.charAt(0)) ? `[Click Me!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})` : 'Aucun lien précisé', inline: true },
      { name: "Raison", value: isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[2])).join(" ") : args.slice(args.indexOf(args[1])).join(" ") }
    )
    .setTimestamp()
    .setFooter("Cette commande est inutilement difficile!");

  client.channels.cache.get('812654959261777940').send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.WARN;
