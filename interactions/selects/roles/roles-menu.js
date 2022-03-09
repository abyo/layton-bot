module.exports = {
  name: "roles-menu",
  async runInteraction(client, interaction) {
    await interaction.member.roles.add(interaction.values);
    await interaction.reply({ content: 'Félication, le bot vous a rajouté votre rôle!', ephemeral: true });
  }
};
