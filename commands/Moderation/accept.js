const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  message.channel.messages.fetch(args[0]).then((msg) => {
    const suggestionToEdit = msg.embeds[0];
    const acceptedSugestion = new MessageEmbed(suggestionToEdit)
      .setTitle(`${suggestionToEdit.title} - acceptée par les CM.`)
      .setColor("#2ba0ff");
    msg.edit(acceptedSugestion);
    msg.reactions.removeAll();
  });
  message.delete();
};

module.exports.help = {
  name: "accept",
  aliases: ["accept"],
  category: "moderation",
  description: "Accepter une suggestion.",
  cooldown: 1,
  usage: "<message_id>",
  isUserAdmin: false,
  adminOnly: true,
  permissions: true,
  args: true,
};
