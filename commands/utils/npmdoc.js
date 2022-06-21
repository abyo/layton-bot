const {
  getInfosFromJson,
  fetchPackage,
  buildEmbed } = require("../../utils/npmdocs/index")

module.exports = {
  name: "npmdocs",
  category: "utils",
  permissions: ["SEND_MESSAGES"],
  ownerOnly: false,
  usage: "<package_name>",
  examples: ["npmdocs discord.js"],
  description: "Renvoi des informations sur un package npm.",
  options: [
    {
      name: "package",
      description: "Le package à renvoyer",
      type: "STRING",
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const packageName = interaction.options.getString("package");
    if (!packageName) return;
    const fetched = await fetchPackage(packageName);
    if (!fetched) return interaction.reply("Ce package n'existe pas");
    const infos = getInfosFromJson(fetched);
    if (!infos) return interaction.reply("Une erreur est survenue lors de la lecture des informations");
    const embed = await buildEmbed(infos);
    interaction.reply({ embeds: [embed] });
  },
};
