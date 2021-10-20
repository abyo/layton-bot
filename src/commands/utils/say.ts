import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SayCommand extends Command {
	public constructor() {
		super('say', {
			aliases: ['say'],
			category: 'utils',
			description: {
				content: 'A command make the bot say something.',
				usage: 'say <message>',
				examples: ['say Je suis un bot!']
			},
			args: [
				{
					id: 'say',
					type: 'string',
					match: 'rest',
					prompt: { start: 'Que voulez-vous que le bot dise ?', retry: '{error} Choisissez quelque chose de valable à dire.' }
				}
			],
      userPermissions: ['KICK_MEMBERS'],
			clientPermissions: ['SEND_MESSAGES'],
		});
	}

	public override async exec(message: Message, { say }: { say: string }): Promise<void> {
		await message.delete().catch(() => {});
		await message.util!.send({ content: say });
	}
}
