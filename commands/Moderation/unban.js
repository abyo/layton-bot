const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  // ?unban 789789788978978
  // user = client.users.fetch('789789788978978');
  let user = await client.users.fetch(args[0]);
  if (!user) return message.reply("l'utilisateur n'existe pas.");
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unban`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Unban`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
    )
    .setTimestamp()
    .setFooter(`Deban par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send(embed);
  client.channels.cache.get("819666347617026089").send(publicEmbed);
};

module.exports.help = {
  name: "unban",
  aliases: ["unban"],
  category: "moderation",
  description: "Unban un utilisateur",
  cooldown: 1,
  usage: "<user_id>",
  isUserAdmin: false,
  adminOnly: false,
  permissions: true,
  args: true,
};
