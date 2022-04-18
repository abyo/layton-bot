const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "unmute [@member]",
  examples: ["unmute @Abyo"],
  description: "Démute un utilisateur",
  options: [
    {
      name: "member",
      description: "L'utilisateur a mute",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "La raison du démute",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member");
    const reason = interaction.options.getString("reason") || "Aucune raison indiquée.";
    const logChannel = client.channels.cache.get(guildSettings.modChannel);

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });
    if (!member.isCommunicationDisabled())
      return interaction.reply({
        content:
          "Ce membre ne peut pas être démute par le bot car il n'est pas mute!",
        ephemeral: true,
      });

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#5CFF9D")
      .setDescription(
        `**Membre**: \`${member.user.tag}\` (${member.id})
      **Action**: Démute
      **Raison**: ${reason}`
      )
      .setTimestamp();

    interaction.channel.send(`${member.user} a été démute.`);
    await logChannel.send({ embeds: [embed] });
    await interaction.reply({
      content: `Le membre ${member} a été démute!`,
      ephemeral: true,
    });
    await member.timeout(null);
  },
};
