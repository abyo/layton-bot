// @ts-nocheck
// TODO: switch file to typescript
import { Listener } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class MessageCreateListener extends Listener {
	public constructor() {
		super('messageCreate', {
			emitter: 'client',
			event: 'messageCreate',
			category: 'guild'
		});
	}

	public override async exec(message: Message): Promise<void> {
		if (message.author.bot) return;
    if (message.channel.type === 'DM') return
    const isModoDecliningSuggestion = async (message: Message) => {
      const messageBefore = await message.channel.messages.fetch({limit: 1, before: message.id})
      if (!messageBefore.size) return false;
      const isDecliningSuggestion = messageBefore.first().content.endsWith(', merci d\'indiquer la raison du refus de la suggestion :')
      const isTheRightModo = messageBefore.first().content && messageBefore.first().mentions.users.size && message.author.id === messageBefore.first().mentions.users.first().id
      return isTheRightModo && isDecliningSuggestion
    }
    
    const boolean = await isModoDecliningSuggestion(message)
    if (boolean) return

    if (message.channel.id == "812735790357938176" && !message.content.startsWith(";")) {
      message.delete();
      const embed = new MessageEmbed()
        .setTitle(`Nouvelle suggestion !`)
        .setAuthor(`${message.author.username} (${(message.author.id)})`, message.author.displayAvatarURL())
        .setColor("#7FFF00")
        .setDescription(message.content)
        .setFooter("Si vous vous êtes trompé dans votre suggestion, réagissez à la suggestion par 🗑️");
      message.channel.send({embeds: [embed]})
        .then(async msg => {
          await msg.react("👍");
          await msg.react("👎");
        });
      return;
    }

    if (message.channel.id == "812757333431550034") {
      if (!message.content.startsWith(";")) message.delete();
    }
	}
}

