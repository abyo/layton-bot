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
      required: true
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
      const methorOrProp = djsutils.resolveMethodOrProp(parent, query);
      if(!methorOrProp) return interaction.reply("Aucun résultat pour votre recherche");
      const embed = djsutils.buildMethodOrPropEmbed(methorOrProp, {github: "https://github.com/discordjs/discord.js/tree/main/packages/discord.js/"});
      interaction.reply({embeds:[embed]});
    }
      break;
    case "parent":{
      const embed = djsutils.buildClassOrTypedefEmbed(parent, {github: "https://github.com/discordjs/discord.js/tree/main/packages/discord.js/"});
      interaction.reply({embeds:[embed]});
      break;
    }
    default:
      interaction.reply("Aucun résultat pour votre recherche");
      break;
    }
  },
};
