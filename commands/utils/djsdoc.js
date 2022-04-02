const djsutils = require("../../utils/djsdoc");
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
      name: "query",
      type: "STRING",
      description: "Votre recherche",
      required: true
    }
  ],
  async runInteraction(client, interaction) {
    const query = interaction.options.getString("query");
    const type = djsutils.getQueryType(query);
    const parent = djsutils.getParent(query);
    if(!parent) return interaction.reply("Aucun résultat pour votre recherche");
    switch (type) {
    case "method/prop": {
      console.log(0);
      const methorOrProp = djsutils.resolveMethodOrProp(parent, query);
      const embed = djsutils.buildMethodOrPropEmbed(methorOrProp);
      interaction.reply({embeds:[embed]});
    }
      break;
    case "parent":{
      const embed = djsutils.buildClassOrTypedefEmbed(parent);
      interaction.reply({embeds:[embed]});
      break;
    }
    default:
      interaction.reply("Aucun résultat pour votre recherche");
      break;
    }
  },
};
