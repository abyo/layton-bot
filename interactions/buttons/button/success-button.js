module.exports = {
  name: "success-button",
  async runInteraction(client, interaction) {
    await interaction.reply({ content: "Je suis le bouton success!" });
  }
};
