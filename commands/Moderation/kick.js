const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let reason = args.splice(1).join(" ") || "Aucune raison spécifiée";
  user
    ? message.guild.member(user).kick(reason)
    : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Kick`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
      {
        name: "Raison",
        value: reason,
      }
    )
    .setTimestamp()
    .setFooter(`Kick par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send(embed);
  client.channels.cache.get("819666347617026089").send(publicEmbed);
};

module.exports.help = {
  name: "kick",
  aliases: ["kick"],
  category: "moderation",
  description: "Kick un utilisateur",
  cooldown: 1,
  usage: "<@user> <raison>",
  isUserAdmin: true,
  adminOnly: false,
  permissions: true,
  args: true,
};
