module.exports.run = (_client, message) => {
  message.reply("Pour refuser une suggestion, il suffit maintenant de réagir avec ❌ sous la suggestion concernée, puis d'indiquer la raison par écrit lorsque le bot vous le demande.")
};

module.exports.help = {
  name: "decline",
  aliases: ["decline"],
  category: "moderation",
  description: "Pour refuser une suggestion, il vous suffit de réagir avec ❌ sous la suggestion concernée, puis d'indiquer la raison par écrit lorsque le bot vous le demande.",
  cooldown: 1,
  usage: "Réagissez simplement sous la suggestion par ❌.",
  isUserAdmin: false,
  permissions: true,
  args: false,
};
