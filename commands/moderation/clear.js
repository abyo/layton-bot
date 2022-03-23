module.exports = {
  name: "clear",
  category: "moderation",
  permissions: ["MANAGE_MESSAGES"],
  ownerOnly: false,
  usage: "clear [amount] <@target>",
  examples: ["clear 50", "clear 50 @Abyo"],
  description:
    "Supprimer un nombre de message spécifié sur un salon ou un utilisateur",
  options: [
    {
      name: "message",
      description: "Le nombre de message à supprimer",
      type: "NUMBER",
      min_value: 1,
      max_value: 100,
      required: true,
    },
    {
      name: "target",
      description: "Sélectionner l'utilisateur pour la suppression de message",
      type: "USER",
      required: false,
    },
  ],
  async runInteraction(client, interaction) {
    const amountToDelete = interaction.options.getNumber("message");
    const target = interaction.options.getMember("target");

    const messagesToDelete = await interaction.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messagesToDelete).filter((msg) => {
        if (msg.author.id == target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg);
          i++;
        }
      });

      await interaction.channel
        .bulkDelete(filteredTargetMessages, true)
        .then((messages) => {
          interaction.reply({
            content: `J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}!`,
            ephemeral: true,
          });
        });
    } else {
      await interaction.channel
        .bulkDelete(amountToDelete, true)
        .then((messages) => {
          interaction.reply({
            content: `J'ai supprimé ${messages.size} messages sur ce salon!`,
            ephemeral: true,
          });
        });
    }
  },
};
