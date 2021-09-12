const { MessageEmbed, DiscordAPIError } = require("discord.js");

const isFirstCharNumeric = (c) => /\d/.test(c);

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  let raison = args[1];

  if (!raison) return message.reply("Il faut indiquer une raison!");
  if (!user) return message.reply("Il faut mentionner un utilisateur!");

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Reporté", value: user.username, inline: true },
      {
        name: "Lien du message",
        value: isFirstCharNumeric(raison.charAt(0))
          ? `[Click Me!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})`
          : "Aucun lien précisé",
        inline: true,
      },
      {
        name: "Raison",
        value: isFirstCharNumeric(raison.charAt(0))
          ? args.slice(args.indexOf(args[2])).join(" ")
          : args.slice(args.indexOf(args[1])).join(" "),
      }
    )
    .setTimestamp()
    .setFooter("Cette commande est inutilement difficile !");

  const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Warn`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
      {
        name: "Raison",
        value: isFirstCharNumeric(raison.charAt(0))
          ? args.slice(args.indexOf(args[2])).join(" ")
          : args.slice(args.indexOf(args[1])).join(" "),
      }
    )
    .setTimestamp()
    .setFooter(`Averti par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send({embeds: [embed]});
  client.channels.cache.get("819666347617026089").send({embeds: [publicEmbed]});
  user.send(`Bonjour, vous avez été warn sur \`${message.guild.name}\` pour la raison suivante: \`${isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[2])).join(" ") : args.slice(args.indexOf(args[1])).join(" ")}\`.`)
    .catch((error) => {
      if (error instanceof DiscordAPIError && error.message == "Cannot send messages to this user") {
        return client.channels.cache.get("812654959261777940").send(`Je n'ai pas pu contacter l'utilisateur de son warn`);
      }
      console.log(error);
    });
  message.delete();
};

module.exports.help = {
  name: "warn",
  aliases: ["warn"],
  category: "moderation",
  description: "Avertir un utilisateur et le message",
  cooldown: 1,
  usage: "<@user> [message_id] <raison>",
  isUserAdmin: true,
  permissions: true,
  args: true,
};
