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
    switch (type) {
    case "method/prop": {
      const parent = djsutils.getParent(query);
      const methorOrProp = djsutils.resolveMethodOrProp(parent, query);
      const embed = djsutils.buildMethodOrPropEmbed(methorOrProp);
      interaction.reply({embeds:[embed]});
    }
      break;
    case "parent":{
      const parent = djsutils.getParent(query);
      const embed = djsutils.buildClassOrTypedefEmbed(parent);
      interaction.reply({embeds:[embed]});
      break;
    }
    default:
      break;
    }
  },
};
