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
      name: "messageid",
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
    const messageId = interaction.options.getString("messageid", true);
    const channel = interaction.options.getChannel("channel", true);

    // Server roles mapping
    // 858359095248683030 (divers-prog): /
    // 811944002424274974 (html-css): 812045425137549342
    // 811945403929853972 (javascript): 812046580701593640
    // 811969395895042111 (typescript): 812046648343396424
    // 811971617042726954 (web-frameworks): 812046798028800022
    // 816382741075591189 (databases): 816383615360434247
    // 816388154012991491 (os-vps): 816387501232488478
    // 811945464646860842 (node-deno): 812048164013998091
    // 811947848559230997 (discord-js): 812048795713798245
    // 811943974759694436 (java): 812048344033001522
    // 811972657964777492 (c-sharp): 812048371237781544
    // 813110747801583617 (golang): 813109631886163969
    // 811944074965024799 (python): 812048404564934656
    const roles = {
      "811944002424274974": "812045425137549342",
      "811945403929853972": "812046580701593640",
      "811969395895042111": "812046648343396424",
      "811971617042726954": "812046798028800022",
      "816382741075591189": "816383615360434247",
      "816388154012991491": "816387501232488478",
      "811945464646860842": "812048164013998091",
      "811947848559230997": "812048795713798245",
      "811943974759694436": "812048344033001522",
      "811972657964777492": "812048371237781544",
      "813110747801583617": "813109631886163969",
      "811944074965024799": "812048404564934656"
    };

    const message = await interaction.channel.messages.fetch(messageId);
    let interactionContent = "";

    if (!message) {
      return interaction.reply({
        content: `Le message avec l'ID ${messageId} n'existe pas.`,
        ephemeral: true,
      });
    }

    const member = message.member;

    if (channel.id === message.channel.id)
      return interaction.reply({
        content: "Le message est déjà dans le bon channel!",
        ephemeral: true,
      });

    if (member.roles.cache.has(roles[channel.id]) || channel.id === "858359095248683030") {
      interactionContent += "Aucun role n'a été donné au membre car il le possède déjà!\n";
    } else {
      await member.roles.add(roles[channel.id]);
      interactionContent += "Le membre a reçu le role correspondant au salon!\n";
    }

    const files = [];

    if (message.attachments.size > 0) {
      const attachments = Array.from(message.attachments.values());
      if (attachments.length > 0) {
        for (const attachment of attachments) {
          files.push(attachment.url);
        }
      }
    }

    message.channel.send(`${message.author} votre message à été redirigé vers le salon ${channel}. Le role correspondant au salon vous a été attribué!`);
    message.delete()
      .then(() => {
        channel.send({ content: message.content, files: files.length > 0 ? files : undefined });
      });

    interactionContent += "Le message a bien été redirigé!";
    await interaction.reply({
      content: interactionContent,
      ephemeral: true,
    });
  },
};
