const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "redirect",
  category: "moderation",
  permissions: ["MODERATE_MEMBERS"],
  ownerOnly: false,
  usage: "redirect [message_id] [#channel]",
  examples: ["redirect 123456789123456789 #discordjs"],
  description: "Redirige un message vers un autre channel",
  options: [
    {
      name: "messageId",
      description: "L'ID du message à rediriger",
      type: "STRING",
    },
    {
        name: "channel",
        description: "Le salon où envoyer le message",
        type: "CHANNEL",
    },  
  ],
  async runInteraction(client, interaction) {
    const messageId = interaction.options.getChannel("messageId", true);
    const channel = interaction.options.getChannel("channel", true);

    if (!messageId)
      return interaction.reply({
        content: "Aucun message n'a été spécifié!",
        ephemeral: true,
      });
    if (!channel)
      return interaction.reply({
        content: "Aucun salon n'a été spécifié!",
        ephemeral: true,
      });

    const message = await channel.messages.fetch(messageId);
    if (!message)
      return interaction.reply({
        content: "Le message n'existe pas!",
        ephemeral: true,
      });
      
    message.channel.send(`${message.author} votre message à été redirigé vers le salon ${channel}. Si vous ne voyez pas le salon, direction <#811949160538177556>`);
    message.delete()
        .then(() => {
            channel.send(message.content)
        })

    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#5ccbfa")
      .setDescription(`**Membre**: ${message.author.tag} (${message.author.id})
      **Action**: Message Redirigé
      **Salon**: ${channel}`)
      .setTimestamp();

    const logChannel = client.channels.cache.get(guildSettings.modChannel);
    logChannel.send({ embeds: [embed] });

    await interaction.reply({
        content: "Le message a bien été redirigé!",
        ephemeral: true,
      });
  },
};
