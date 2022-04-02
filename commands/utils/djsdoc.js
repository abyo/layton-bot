const djsutils = require("../../utils/djsdoc");
const constants = require("../../constants");
module.exports = {
  name: "djsdoc",
  category: "utils",
  permissions: ["SEND_MESSAGES"],
  ownerOnly: false,
  usage: "djsdoc",
  examples: ["djsdoc"],
  description: "Renvoi la doc de Discord.js",
  options: [
    {
      name: "doc",
      description: "La doc à afficher",
      required: true,
      type: "STRING",
      choices: constants.djsdocs.map((x) => { return {name: x.name, value: x.name};})
    },
    {
      name: "query",
      type: "STRING",
      description: "Votre recherche",
      required: true,
      autocomplete: true
    },

  ],
  async runInteraction(client, interaction) {
    const docName = interaction.options.getString("doc");
    const doc = client.constants.djsdocs.find((x) => x.name === docName);
    if(!doc) return interaction.channel.send("La doc n'existe pas");
    const data = doc.data;

    const query = interaction.options.getString("query");
    const type = djsutils.getQueryType(query);

    // Un parent est une classe ou un typedef
    const parent = djsutils.getParent(data, query);
    if(!parent) return interaction.reply("Aucun résultat pour votre recherche");


    // Séléction des différents types d'embeds
    switch (type) {
    case "method/prop": {
      const methorOrProp = djsutils.resolveMethodOrPropOrEvent(parent, query);
      if(!methorOrProp) return interaction.reply("Aucun résultat pour votre recherche");
      const embed = djsutils.buildSpecificEmbed(methorOrProp, doc);
      interaction.reply({embeds:[embed]});
    }
      break;
    case "parent":{
      const embed = djsutils.buildGeneralEmbed(parent, doc);
      interaction.reply({embeds:[embed]});
      break;
    }
    default:
      interaction.reply("Aucun résultat pour votre recherche");
      break;
    }
  },
  async runAutocomplete(client, interaction,) {
    const focusedOption = interaction.options.getFocused(true);
    const docName = interaction.options.getString("doc");
    const doc = client.constants.djsdocs.find((x) => x.name === docName);
    if(!doc) return;
    const filtered = doc.search.filter(choice => choice.includes(focusedOption.value));
    const filteredLimit = filtered.slice(0, 25);
    await interaction.respond(filteredLimit.map(choice => ({ name: choice, value: choice })));
    // const choices = guildSettings.faq?.map(tag => tag.name);
    // if(!choices) return;
    // const filtered = choices.filter(choice => choice.includes(focusedOption.value.toLowerCase()));
    // const filteredLimit = filtered.slice(0, 15);
    // await interaction.respond(filteredLimit.map(choice => ({ name: choice, value: choice })));
  }
};
