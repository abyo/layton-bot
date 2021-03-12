const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "muted");

  if (!user.roles.cache.has(muteRole.id))
    return message.reply("l'utilisateur mentionné n'est pas muté!");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus muté!`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unmute`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Unmute`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
    )
    .setTimestamp()
    .setFooter(`Unmute par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send(embed);
  client.channels.cache.get("819666347617026089").send(publicEmbed);
};

module.exports.help = {
  name: "unmute",
  aliases: ["unmute"],
  category: "moderation",
  description: "Unmute un utilisateur",
  cooldown: 1,
  usage: "<@user>",
  isUserAdmin: false,
  adminOnly: false,
  permissions: true,
  args: true,
};
