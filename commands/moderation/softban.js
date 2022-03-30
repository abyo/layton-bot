const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "softban",
  category: "moderation",
  permissions: ["BAN_MEMBERS"],
  ownerOnly: false,
  usage: "softban [@member] [reason]",
  examples: ["softban @Abyo raison"],
  description: "Softban un utilisateur (ban puis unban) avec une raison",
  options: [
    {
      name: "member",
      description: "L'utilisateur à softban",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "La raison du softban",
      type: "STRING",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member", true);
    const reason =
      interaction.options.getString("reason") || "Aucune raison indiquée.";
    const logChannel = client.channels.cache.get(guildSettings.modChannel);

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });
    if (!member.bannable)
      return interaction.reply({
        content: "Ce membre ne peut pas être softban par le bot!",
        ephemeral: true,
      });

    const embed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.member.displayName} (${interaction.member.id})`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("ffb969")
      .setDescription(
        `**Membre**: \`${member.user.tag}\` (${member.id})
      **Action**: Softban
      **Raison**: ${reason}`
      )
      .setTimestamp();

    await interaction.reply({
      content: `Le membre ${member} a été softban!`,
      ephemeral: true,
    });
    await logChannel.send({ embeds: [embed] });
    await member.ban({ reason: reason, days: 7 });
    await interaction.guild.members.unban(member.id);
  },
};
