import { Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

export default class PurgeCommand extends Command {
	public constructor() {
		super('purge', {
			aliases: ['purge'],
			category: 'moderation',
      channel: 'guild',
			description: {
				content: 'Purge un nombre de message spécifié.',
				usage: '<nbr_messages>',
				examples: ['purge 50']
			},
			args: [
				{
					id: 'messageToDelete',
				  type: 'number'
				},
			],
      // TODO: modify permissions
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS']
		});
	}

	public override async exec(message: Message, {messageToDelete}: {messageToDelete: number}): Promise<unknown> {
    const logChannel = client.channels.cache.get(client.config.channels.log);
    if (isNaN(messageToDelete) || messageToDelete < 1 || messageToDelete > 100) return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100 !");

		const messages = await message.channel.messages.fetch({
			limit: Math.min(messageToDelete, 100),
			before: message.id,
		});

		message.delete();
		await (message.channel as TextChannel).bulkDelete(messages);

		const embed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setColor("#287db5")
			.setDescription(
				`**Action**: purge\n**Nbr de messages**: ${messageToDelete}\n**Salon**: ${message.channel}`
			);

		return (logChannel as TextChannel).send({ embeds: [embed] });
	}
}
