import { Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel, User } from 'discord.js';

export default class BanCommand extends Command {
	public constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'moderation',
      channel: 'guild',
			description: {
				content: 'Ban a member from the server.',
				usage: 'ban <member> <reason>',
				examples: ['ban @a6yo for fun']
			},
			args: [
				{
					id: 'user',
				  type: 'user'
				},
				{
					id: 'reason',
					type: 'string',
					match: 'restContent'
				},
			],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS']
		});
	}

	public override async exec(message: Message, { user, reason }: { user: User, reason: string }): Promise<unknown> {
    const logChannel = client.channels.cache.get(client.config.channels.log);
    if (!reason) reason = 'Raison non spécifiée';

    user ? message.guild!.bans.create(user, { days: 7, reason: reason }): message.channel.send("L'utilisateur n'existe pas.");

    const embed = new MessageEmbed()
      .setAuthor(`${user.username} (${user.id})`, user.displayAvatarURL())
      .setColor("#dc143c")
      .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
      .setTimestamp()
      .setFooter(`Banni par ${message.author.username}`, message.author.displayAvatarURL());

    return (logChannel as TextChannel).send({ embeds: [embed] });
	}
}
