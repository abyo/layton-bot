import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CreateCommand extends Command {
	public constructor() {
		super('create', {
			aliases: ['create'],
			category: 'embed',
      channel: 'guild',
			description: {
				content: 'Create an embed.',
				usage: 'create',
				examples: ['create']
			},
			ownerOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	public override async exec(message: Message): Promise<void> {
		// Use Zira's builder: https://zira.gg/embedbuilder/
    const embed = {
			"color": 0,
			"title": "Test",
			"description": "Test"
		};
		message.channel.send({ embeds: [embed] });
	}
}
