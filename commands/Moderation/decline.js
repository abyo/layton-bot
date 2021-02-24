const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  message.channel.messages.fetch(args[0]).then((msg) => {
    const suggestionToEdit = msg.embeds[0];
    const refusedSugestion = new MessageEmbed(suggestionToEdit)
      .setTitle(`${suggestionToEdit.title} - refusée par les CM.`)
      .setColor("RED");
    msg.edit(refusedSugestion);
    msg.reactions.removeAll();
  });
  message.delete();
};

module.exports.help = {
  name: "decline",
  aliases: ["decline"],
  category: "moderation",
  description: "Decliner une suggestion.",
  cooldown: 1,
  usage: "<message_id>",
  isUserAdmin: false,
  permissions: true,
  args: true,
};
