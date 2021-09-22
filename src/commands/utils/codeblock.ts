import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SharingCodeCommand extends Command {
	public constructor() {
		super('codeblock', {
			aliases: ['codeblock', 'cblock', 'format'],
			description: {
				content: 'Comment envoyer votre code correctement!',
			},
			category: 'utils',
			channel: 'guild'
		});
	}

	public override async exec(message: Message) {
    message.channel.send({
      files: ['https://cdn.discordapp.com/attachments/705029954844360715/730066976503889930/code.png']
    });
    message.channel.send(`Merci d'envoyer votre code avec le format ci-dessous, votre erreur et ce que vous avez esssayé de faire pour résoudre votre problème. Difficile de vous aider sans ces deux choses.`)
	}
}