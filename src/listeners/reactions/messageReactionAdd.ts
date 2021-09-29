// @ts-nocheck
// TODO: switch file to typescript
import { Listener } from 'discord-akairo';
import { Collection, Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';

export default class MessageReactionAddListener extends Listener {
	public constructor() {
		super('messageReactionAdd', {
			emitter: 'client',
			event: 'messageReactionAdd',
			category: 'guild'
		});
	}

	public override async exec(messageReaction: MessageReaction, user: User): Promise<void> {
		if (user.bot) return;
		if (messageReaction.partial) await messageReaction.fetch();
		if (messageReaction.message.channel.id !== '895675882348351509') return;
		if (['👍', '👎'].includes((messageReaction.emoji.name as string))) return;
    
		let author = undefined;
		if (messageReaction.message.embeds[0].author)
			author = messageReaction.message.embeds[0].author.name
				.split(' ')
				.pop()
				.replace('(', '')
				.replace(')', '');
		if (author === user.id && messageReaction.emoji.name === '🗑️')
			return (messageReaction.message.delete().catch() as Promise<void>);
		if (['❌', '✅'].includes((messageReaction.emoji.name as string))) {
			const member = await messageReaction.message.guild.members.fetch(user.id);
			if (
				member.roles.cache.get('812048910344257566') ||
				user.id === '520876241646125059'
			) {
				if (messageReaction.emoji.name === '✅') {
					const suggestionToEdit = messageReaction.message.embeds[0];
					const acceptedSugestion = new MessageEmbed(suggestionToEdit)
						.setTitle(`Suggestion acceptée par les modérateurs.`)
						.setColor('#2ba0ff')
						.setFooter('Cette suggestion sera mise en place prochainement.');
					messageReaction.message.edit({ embeds: [acceptedSugestion] });
					messageReaction.message.reactions.removeAll();
					return client.channels.cache.get('820374615427383347').send({
							embeds: [
								{
									title: 'Suggestion acceptée',
									author: {
										name: `${user.username} (${user.id})`,
										iconURL: user.displayAvatarURL(),
									},
									description: `[Suggestion acceptée](https://discordapp.com/channels/810091118401552395/895675882348351509/${messageReaction.message.id})`,
									timestamp: Date.now(),
								},
							],
						});
				}
				const message = await messageReaction.message.channel.send(
					`${user.toString()}, merci d'indiquer la raison du refus de la suggestion :`,
				);
				const filter = (msg: Message) => {
					if (msg.author.id === user.id) return true;
					msg.delete().catch();
				};
				const collected = await messageReaction.message.channel
				.awaitMessages({ filter: filter, max: 1, time: 20000 })
				.catch(() => {
					return new Collection().set('0', {
						content: 'Aucune raison spécifiée.',
					});
				});
				const suggestionToEdit = messageReaction.message.embeds[0];
				const refusedSugestion = new MessageEmbed(suggestionToEdit)
				.setTitle(`Suggestion refusée par les modérateurs.`)
				.setColor('#dc143c')
				.addField('Raison du refus : ', collected.first().content)
				.setFooter('Cette suggestion a été rejetée par le staff.');
				messageReaction.message.edit({ embeds: [refusedSugestion] });
				collected.first().delete().catch();
				message.delete();
				messageReaction.message.reactions.removeAll();
				return messageReaction.message.guild.channels.cache
					.get('820374615427383347')
					.send({
						embeds: [
							{
								title: 'Suggestion refusée',
								author: {
									name: `${user.username} (${user.id})`,
									iconURL: user.displayAvatarURL(),
								},
								description: `[Suggestion refusée](https://discordapp.com/channels/810091118401552395/895675882348351509/${messageReaction.message.id})`,
								timestamp: Date.now(),
							},
						],
					});
			}
		}
		messageReaction.users.remove(user);
	}
}
