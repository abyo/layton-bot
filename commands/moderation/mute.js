const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "mute [@member] [duration] [reason]",
  examples: ["mute @Abyo 5m raison", "mute @Abyo 2h raison"],
  description: "Mute un utilisateur temporairement avec une raison",
  options: [
    {
      name: "member",
      description: "L'utilisateur a mute",
      type: "USER",
      required: true,
    },
    {
      name: "duration",
      description: "La durée du mute",
      type: "STRING",
      required: true,
    },
    {
      name: "reason",
      description: "La raison du mute",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member", true);
    const duration = interaction.options.getString("duration");
    const convertedTime = ms(duration);
    const reason = interaction.options.getString("reason") || "Aucune raison indiquée.";
    const logChannel = client.channels.cache.get(guildSettings.modChannel);

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });
    if (!member.moderatable)
      return interaction.reply({
        content: "Ce membre ne peut pas être mute par le bot!",
        ephemeral: true,
      });
    if (!convertedTime)
      return interaction.reply({
        content: "Spécifier une durée valable!",
        ephemeral: true,
      });

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#F79554")
      .setDescription(
        `**Membre**: \`${member.user.tag}\` (${member.id})
      **Action**: Mute
      **Raison**: ${reason}`
      )
      .setTimestamp();

    await logChannel.send({ embeds: [embed] });
    await interaction.reply({
      content: `Le membre ${member} a été mute pour ${duration} car ${reason}!`,
      ephemeral: true,
    });
    await member.timeout(convertedTime, reason);
  },
};
