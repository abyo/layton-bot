module.exports = {
  name: "lswarn",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "lswarn [@user]",
  examples: ["lswarn @Abyo"],
  description: "Renvoyer une liste des warns d'un utilisateur",
  options: [
    {
      name: "member",
      description: "L'utilisateur qu'il faut rechercher",
      type: "USER",
      required: true,
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member", true);

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });

    const filteredUser = guildSettings.users.filter((u) => u.id == member.id);
    if (filteredUser.length == 0)
      return interaction.reply(
        "Cet utilisateur n'a pas été warn sur ce serveur!"
      );

    let warnList = `Liste des warns pour \`${member.user.tag}\` (**${member.id}**):\n`;

    for (let warn of filteredUser) {
      warnList += `**${warn.case}** - Par \`${warn.moderator}\` (le ${warn.date}). Raison: \`${warn.reason}\`\n`;
    }

    await interaction.reply(warnList);
  },
};
