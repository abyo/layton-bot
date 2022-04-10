const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");

module.exports = {
  name: "warn",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "warn [@user] [raison]",
  examples: ["warn @Abyo raison"],
  description: "Warn un utilisateur avec une raison",
  options: [
    {
      name: "member",
      description: "L'utilisateur a warn",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "La raison du warn",
      type: "STRING",
    },
  ],
  async runInteraction(client, interaction, guildSettings) {
    const member = interaction.options.getMember("member", true);
    const reason =
      interaction.options.getString("reason") || "Aucune raison indiquée!";

    if (!member)
      return interaction.reply({
        content: "Le membre n'a pas été trouvé!",
        ephemeral: true,
      });

    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#5ccbfa")
      .setDescription(`**Membre**: ${member.user.tag} (${member.id})
      **Action**: Warn
      **Raison**: ${reason}`);

    const userArray = guildSettings.users;
    const cases = guildSettings.users.map((u) => u.case);
    let highestCase = Math.max(...cases);
    if (highestCase == -Infinity) highestCase = 0;

    const user = {
      case: highestCase + 1,
      name: member.displayName,
      id: member.id,
      moderator: interaction.user.tag,
      reason: reason,
      date: dayjs().format("DD/MM/YYYY - HH:mm"),
    };

    userArray.push(user);
    await client.updateGuild(interaction.guild, { users: userArray });

    // TODO: leave a message for when the user is warned
    const logChannel = client.channels.cache.get(guildSettings.modChannel);
    logChannel.send({ embeds: [embed] });

    await interaction.reply({
      content: "La commande warn a été exécutée",
      ephemeral: true,
    });
  },
};
