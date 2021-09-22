import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SharingCodeCommand extends Command {
	public constructor() {
		super('sharingcode', {
			aliases: ['sharingcode', 'shcode', 'shc'],
			description: {
				content: 'Renvoie une liste de liens où il est possible de partager son code.',
			},
			category: 'utils',
			channel: 'guild'
		});
	}

	public override async exec(message: Message) {
message.channel.send(`\`\`\`• https://gist.github.com/
• https://paste.nomsy.net/
• https://hasteb.in/
• https://sourceb.in/
• https://hastebin.com/\`\`\``);
	}
}