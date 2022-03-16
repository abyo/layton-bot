const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ban",
  category: 'moderation',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'ban [@member] [reason]',
  examples: ['ban @Abyo raison'],
  description: "Bannir un utilisateur avec une raison",
  options: [
    {
      name: "member",
      description: "L'utilisateur a ban",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "La raison du ban",
      type: "STRING",
      required: true
    }
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember('member', true);
    const reason = interaction.options.getString('reason');
    const logChannel = client.channels.cache.get(guildSettings.modChannel);

    if (!member) return interaction.reply({ content: "Le membre n'a pas été trouvé!", ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: 'Ce membre ne peut pas être ban par le bot!', ephemeral: true });

    const embed = new MessageEmbed()
      .setAuthor({ name: `${interaction.member.displayName} (${interaction.member.id})`, iconURL: interaction.user.displayAvatarURL() })
      .setColor('#FF5C5C')
      .setDescription(`**Membre**: \`${member.user.tag}\` (${member.id})
      **Action**: Ban
      **Raison**: ${reason}`)
      .setTimestamp()

    await interaction.reply({ content: `Le membre ${member} a été ban!`, ephemeral: true });
    await logChannel.send({ embeds: [embed] });
    await member.ban({ reason: reason, days: 7 });
  }
};
