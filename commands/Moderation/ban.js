const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let banReason = args.splice(1).join(" ") || "Aucune raison spécifiée";
  user
    ? message.guild.member(user).ban({ days: 7, reason: banReason })
    : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action**: ban\n**Raison**: ${banReason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get("812654959261777940").send(embed);
};

module.exports.help = {
  name: "ban",
  aliases: ["ban"],
  category: "moderation",
  description: "Ban un utilisateur",
  cooldown: 1,
  usage: "<@user> <raison>",
  isUserAdmin: true,
  adminOnly: false,
  permissions: true,
  args: true,
};
