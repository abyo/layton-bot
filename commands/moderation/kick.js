const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  permissions: ["KICK_MEMBERS"],
  ownerOnly: false,
  usage: "kick [@member] [reason]",
  examples: ["kick @Abyo raison"],
  description: "Kick un utilisateur avec une raison",
  options: [
    {
      name: "member",
      description: "L'utilisateur a kick",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "La raison du kick",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member", true);
    const reason = interaction.options.getString("reason") || "Aucune raison indiquée.";
    const logChannel = client.channels.cache.get(guildSettings.modChannel);

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });
    if (!member.kickable)
      return interaction.reply({
        content: "Ce membre ne peut pas être kick par le bot!",
        ephemeral: true,
      });

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#FF5C5C")
      .setDescription(
        `**Membre**: \`${member.user.tag}\` (${member.id})
      **Action**: Kick
      **Raison**: ${reason}`
      )
      .setTimestamp();

    await interaction.reply({
      content: `Le membre ${member} a été kick!`,
      ephemeral: true,
    });
    await logChannel.send({ embeds: [embed] });
    await member.kick(reason);
  },
};
