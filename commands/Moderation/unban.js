const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let guildBan = await message.guild.bans.fetch(args[0]);
  const raison = args.splice(1).join(" ") || "Aucune raison spécifiée"
  if (!guildBan) return message.reply("L'utilisateur n'est pas banni.");
  message.guild.bans.remove(guildBan.user, raison);

  const embed = new MessageEmbed()
    .setAuthor(`${guildBan.user.username} (${guildBan.user.id})`, guildBan.user.avatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unban`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${guildBan.user.tag} | Unban`, guildBan.user.displayAvatarURL())
    .setThumbnail(guildBan.user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: guildBan.user.username, inline: true },
      { name: "ID", value: guildBan.user.id, inline: true },
      { name: "Raison", value: raison }
    )
    .setTimestamp()
    .setFooter(`Deban par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send({embeds:[embed]});
  client.channels.cache.get("819666347617026089").send({embeds: [publicEmbed]});
};

module.exports.help = {
  name: "unban",
  aliases: ["unban"],
  category: "moderation",
  description: "Unban un utilisateur",
  cooldown: 1,
  usage: "<user_id>",
  isUserAdmin: false,
  permissions: true,
  args: true,
};
