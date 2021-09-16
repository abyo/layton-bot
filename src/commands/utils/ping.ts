import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('ping', {
			aliases: ['ping'],
			category: 'utils',
			description: {
				content: 'Gets the latency of the bot',
				usage: 'ping',
				examples: ['ping']
			},
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			userPermissions: ['SEND_MESSAGES']
		});
	}

	public override async exec(message: Message): Promise<void> {
		const sentMessage = (await message.util!.send('Pong!')) as Message;
		const timestamp: number = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
		const botLatency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timestamp)}ms ${'```'}`;
		const apiLatency = `${'```'}\n ${Math.round(message.client.ws.ping)}ms ${'```'}`;
		const embed = new MessageEmbed()
			.setTitle('Pong!  🏓')
			.addField('Bot Latency', botLatency, true)
			.addField('API Latency', apiLatency, true)
			.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      // TODO: CONSTANT -> Move colors to separate file for re-use
			.setColor('#42d6ff')
			.setTimestamp();

		await sentMessage.edit({
			content: null,
			embeds: [embed]
		});
	}
}
