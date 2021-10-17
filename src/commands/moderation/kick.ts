import { Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel, User } from 'discord.js';

export default class KickCommand extends Command {
	public constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'moderation',
      channel: 'guild',
			description: {
				content: 'Kick a member from the server.',
				usage: 'kick <member> <reason>',
				examples: ['kick @a6yo for fun']
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
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS']
		});
	}

	public override async exec(message: Message, { user, reason }: { user: User, reason: string }): Promise<unknown> {
    const logChannel = client.channels.cache.get(client.config.channels.log);
    let member = message.mentions!.members!.first();
		
    member ? member.kick(reason) : message.channel.send("L'utilisateur n'existe pas.");
    if (!reason) reason = 'Raison non spécifiée';

    const embed = new MessageEmbed()
      .setAuthor(`${user.username} (${user.id})`, user.displayAvatarURL())
      .setColor("#dc143c")
      .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
      .setTimestamp()
      .setFooter(`Kick par ${message.author.username}`, message.author.displayAvatarURL());

    return (logChannel as TextChannel).send({ embeds: [embed] });
	}
}
