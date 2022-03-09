const ms = require('ms');

module.exports = {
  name: "mute",
  category: 'moderation',
  permissions: ['MODERATE_MEMBERS'],
  ownerOnly: false,
  usage: 'mute [@member] [duration] [reason]',
  examples: ['mute @Abyo 4 minutes raison'],
  description: "Mute un utilisateur temporairement avec une raison",
  options: [
    {
      name: "target",
      description: "L'utilisateur a mute",
      type: "USER",
      required: true
    },
    {
      name: "duration",
      description: "La durée du mute",
      type: "STRING",
      required: true
    },
    {
      name: "reason",
      description: "La raison du mute",
      type: "STRING",
      required: true
    }
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getString('duration');
    const convertedTime = ms(duration);
    const reason = interaction.options.getString('reason');

    if (!target.moderatable) return interaction.reply('Ce membre ne peut pas être mute par le bot!');
    if (!convertedTime) return interaction.reply('Spécifier une durée valable!');

    target.timeout(convertedTime, reason);
    interaction.reply(`Le membre ${target} a été mute pour ${duration} car ${reason}!`);
  }
};
