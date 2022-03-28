module.exports = {
  name: "rwarn",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "rwarn [case_number]",
  examples: ["lswarn 1"],
  description: "Supprimer un warn avec le numéro de la case",
  options: [
    {
      name: "casenumber",
      description: "Le numéro de la case à supprimer",
      type: "NUMBER",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const caseNumber = interaction.options.getNumber("casenumber");

    const filteredCase = guildSettings.users
      .map((u) => u.case)
      .indexOf(caseNumber);
    if (filteredCase == -1) return interaction.reply("Ce warn n'existe pas!");
    guildSettings.users.splice(filteredCase, 1);

    await client.updateGuild(interaction.guild, {
      users: guildSettings.users,
    });

    await interaction.reply(`Le warn n°${caseNumber} a été supprimé!`);
  },
};
