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
      required: true,
    },
    {
      name: "channel",
      description: "Le salon où envoyer le message",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },  
  ],
  async runInteraction(client, interaction) {
    const messageId = interaction.options.getChannel("messageId", true);
    const channel = interaction.options.getChannel("channel", true);

    const message = await interaction.channel.messages.fetch(messageId);
    if (!message)
    return interaction.reply({
        content: "Le message n'existe pas!",
        ephemeral: true,
    });
    
    const files = [];
    if (message.attachments.size > 0) {
        const attachments = message.attachments.array();
        if (attachments.length > 0) {
            for (const attachment of attachments) {
                files.push(attachment.url);
            }
        }
    };
      
    message.channel.send(`${message.author} votre message à été redirigé vers le salon ${channel}. Si vous ne voyez pas le salon, direction <#811949160538177556>`);
    message.delete()
        .then(() => {
            channel.send({ content: message.content, files: files.length > 0 ? files : undefined });
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
