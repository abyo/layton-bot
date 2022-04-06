/**
 * Commande FAQ
 * Cette commande permet de gérer les tags de la FAQ
 * Sous commandes:
 * - add
 * - rm
 * - mdfy
 * - list
 * - show
 */
const {hasHelperOrModoPerms} = require("../../utils/index.js");

module.exports = {
  name: "faq",
  category: "utils",
  permissions: ["SEND_MESSAGES"],
  ownerOnly: false,
  usage: "faq add <name> <category> <answer>",
  examples: [
    "faq add name:DISALLOWED_INTENTS category:discord.js description:Vous devez activer les intents via le pannel du bot sur https://discord.dev",
  ],
  description: "Cette commande permet de gérer les différents tags de faq",
  options: [
    {
      name: "add",
      description: "Ajoute un tag sur le serveur.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "nom",
          description: "Nom du tag (ex: cours-js).",
          type: "STRING",
          required: true,
        },
        {
          name: "description",
          description: "Description du tag.",
          type: "STRING",
          required: true,
        },
        {
          name: "category",
          description: "Catégorie du tag (ex: discord.js | javascript).",
          type: "STRING",
          required: true,
        },
        {
          name: "contenu",
          description: "Contenu du tag.",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "rm",
      description: "Enlève un tag de la FAQ.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "nom",
          description: "Nom du tag à enlever.",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "mdfy",
      description: "Modifie le contenu d'un tag.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "nom",
          description: "Nom du tag à changer.",
          type: "STRING",
          required: true,
        },
        {
          name: "contenu",
          description: "Contenu du tag.",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "show",
      description: "Montre un tag de la faq.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "show",
          description: "Nom du tag à montrer.",
          type: "STRING",
          required: true,
          autocomplete:true,
        },
        {
          name: "member",
          description: "Membre concerné par la faq.",
          type: "USER",
          required: true,
        }
      ],
    },
    {
      name: "list",
      description: "Montre tous les tags de la faq.",
      type: "SUB_COMMAND",
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    switch (interaction.options.getSubcommand()) {
    case "add":{
      if(!hasHelperOrModoPerms(interaction.member)) return interaction.reply("Vous n'avez pas la permission de faire cette commande.");
      const name = interaction.options.getString("nom")?.trim()?.toLowerCase();
      const description = interaction.options.getString("description")?.trim();
      const category = interaction.options.getString("category")?.trim();
      const content = interaction.options.getString("contenu")?.trim();
      if(!name || !description || !category || !content) return interaction.reply("Veuillez entrer tous les champs.");
      if(!guildSettings.faq) guildSettings.faq = [];
      const checkDup = guildSettings.faq.find(faq => faq.name === name);
      if (checkDup) return interaction.reply("Ce tag existe déjà.");
      guildSettings.faq.push({
        name,
        description,
        category,
        content,
      });
      await guildSettings.save();
      interaction.reply("Le tag a bien été ajouté.");
      break;
    }
    case "rm":{
      if(!hasHelperOrModoPerms(interaction.member)) return interaction.reply("Vous n'avez pas la permission de faire cette commande.");
      const name = interaction.options.getString("nom")?.trim()?.toLowerCase();
      if(!name) return interaction.reply("Veuillez entrer un nom de tag.");
      if(!guildSettings.faq) return interaction.reply("Il n'y a pas de tags.");
      const faq = guildSettings.faq.find(faq => faq.name === name);
      if(!faq) return interaction.reply("Ce tag n'existe pas.");
      guildSettings.faq = guildSettings.faq.filter(faq => faq.name !== name);
      await guildSettings.save();
      interaction.reply("Le tag a bien été supprimé.");
      break;
    }
    case "mdfy":{
      if(!hasHelperOrModoPerms(interaction.member)) return interaction.reply("Vous n'avez pas la permission de faire cette commande.");
      const name = interaction.options.getString("nom")?.trim()?.toLowerCase();
      if(!name) return interaction.reply("Veuillez entrer un nom de tag.");
      if(!guildSettings.faq) return interaction.reply("Il n'y a pas de tags.");
      const faq = guildSettings.faq.find(faq => faq.name === name);
      if(!faq) return interaction.reply("Ce tag n'existe pas.");
      const content = interaction.options.getString("contenu")?.trim();
      if(!content) return interaction.reply("Veuillez entrer un contenu.");
      faq.content = content;
      await client.updateGuild(interaction.guild, guildSettings);
      interaction.reply("Le tag a bien été modifié.");
      break;
    }
    case "show":{
      const name = interaction.options.getString("show")?.trim()?.toLowerCase();
      const member = interaction.options.getMember("member", true);
      if (!member)
        return interaction.reply({
          content: "Le membre n'a pas été trouvé!",
          ephemeral: true,
        });
      if(!name) return interaction.reply("Veuillez entrer un nom de tag.");
      if(!guildSettings.faq) return interaction.reply("Il n'y a pas de tags.");
      const faq = guildSettings.faq.find(faq => faq.name === name);
      if(!faq) return interaction.reply("Ce tag n'existe pas.");
      interaction.reply(`${member}, tu es probablement concerné par cette réponse:\n${faq.content}`);
      break;
    }
    case "list":{
      if(!guildSettings.faq) return interaction.reply("Il n'y a pas de tags.");
      const faq = guildSettings.faq.map(faq => `**${faq.name}** : ${faq.description}`).join("\n");
      interaction.reply(faq);
      break;
    }
    }
  },
  async runAutocomplete(client, interaction, guildSettings) {
    const focusedOption = interaction.options.getFocused(true);
    const choices = guildSettings.faq?.map(tag => tag.name);
    if(!choices) return;
    const filtered = choices.filter(choice => choice.includes(focusedOption.value.toLowerCase()));
    const filteredLimit = filtered.slice(0, 15);
    await interaction.respond(filteredLimit.map(choice => ({ name: choice, value: choice })));
  }
};
