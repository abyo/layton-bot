const ms = require("ms");
const { MessageEmbed, DiscordAPIError } = require("discord.js");

const isFirstCharNumeric = (c) => /\d/.test(c);

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "muted");
  let muteTime = args[1] || "60s";
  let raison = args[2];
  
  if (!muteTime || isNaN(ms(muteTime))) return message.reply("Il faut indiquer un temps")
  
  if (!raison) return message.reply("Il faut indiquer une raison!");

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: "muted",
        color: "#000",
        permissions: [],
      },
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });
    });
  }

  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}\n**Raison**: ${isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[3])).join(" ") : args.slice(args.indexOf(args[2])).join(" ")}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.user.tag} | Mute`, user.user.displayAvatarURL())
    .setThumbnail(user.user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
      { name: "Temps", value: ms(ms(muteTime)), inline: true },
      {
        name: "Raison",
        value: isFirstCharNumeric(raison.charAt(0))
          ? args.slice(args.indexOf(args[3])).join(" ")
          : args.slice(args.indexOf(args[2])).join(" "),
      }
    )
    .setTimestamp()
    .setFooter(`Muté par ${message.author.username}`, message.author.displayAvatarURL());

  client.channels.cache.get("812654959261777940").send(embed);
  client.channels.cache.get("819666347617026089").send(publicEmbed);
  user.user.send(`Bonjour, vous avez été mute sur \`${message.guild.name}\` pour la raison suivante: \`${isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[3])).join(" ") : args.slice(args.indexOf(args[2])).join(" ")}\`.`)
    .catch((error) => {
      if (error instanceof DiscordAPIError && error.message == "Cannot send messages to this user") {
        return client.channels.cache.get("812654959261777940").send(`Je n'ai pas pu contacter l'utilisateur de son mute`);
      }
      console.log(error);
    });
};

module.exports.help = {
  name: "mute",
  aliases: ["mute"],
  category: "moderation",
  description: "Mute un utilisateur",
  cooldown: 1,
  usage: "<@user> <time>",
  isUserAdmin: true,
  adminOnly: false,
  permissions: true,
  args: true,
};
