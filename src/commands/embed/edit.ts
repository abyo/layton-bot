import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class EditCommand extends Command {
	public constructor() {
		super('edit', {
			aliases: ['edit'],
			category: 'embed',
      channel: 'guild',
			description: {
				content: 'Edit an embed.',
				usage: 'edit',
				examples: ['edit']
			},
			ownerOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	public override async exec(message: Message): Promise<void> {
    const embedToEdit = await message.channel.messages.fetch('900340365159178250');
		
    // Use Zira's builder: https://zira.gg/embedbuilder/
    const embed = {
			"color": 0,
			"title": "LOL",
			"description": "LOL"
		};

		embedToEdit.edit({ embeds: [embed] });
	}
}
