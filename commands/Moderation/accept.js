module.exports.run = (_client, message) => {
  message.reply("Pour accepter une suggestion, il suffit maintenant de réagir avec ✅ sous la suggestion que vous souhaiter accepter.")
};

module.exports.help = {
  name: "accept",
  aliases: ["accept"],
  category: "moderation",
  description: "Pour accepter une suggestion, il suffit maintenant de réagir avec ✅ sous la suggestion que vous souhaiter accepter.",
  cooldown: 1,
  usage: "Réagissez simplement sous la suggestion par ✅.",
  isUserAdmin: false,
  permissions: true,
  args: false,
};
