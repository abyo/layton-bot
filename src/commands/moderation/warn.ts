import { Command } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel, User } from 'discord.js';

export default class WarnCommand extends Command {
	public constructor() {
		super('warn', {
			aliases: ['warn'],
			category: 'moderation',
      channel: 'guild',
			description: {
				content: 'Avertir un utilisateur.',
				usage: '<@user> <raison>',
				examples: ['@a6yo Problème']
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
    if (!reason) return message.reply("Il faut indiquer une raison!");
    if (!user) return message.reply("Il faut mentionner un utilisateur!");

    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Reporté", value: user.username },
        { name: "Raison",  value: reason }
      )
      .setTimestamp()


    return (logChannel as TextChannel).send({ embeds: [embed] });
	}
}
