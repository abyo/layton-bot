module.exports = {
  name: "danger-button",
  async runInteraction(client, interaction) {
    await interaction.reply({ content: 'Je suis le bouton danger!' });
  }
};
