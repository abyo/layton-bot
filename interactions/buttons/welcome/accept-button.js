module.exports = {
  name: "accept-button",
  async runInteraction(client, interaction) {
    await interaction.member.roles.add('949004232483303434');
    await interaction.reply({ content: 'Vous avez accepté les règles! Vous pouvez maintenant accéder au serveur', ephemeral: true });
  }
};
