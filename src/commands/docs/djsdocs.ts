// @ts-nocheck
// TODO: Fix TS errors

import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import fetch from 'node-fetch';

export default class DjsDocsCommand extends Command {
	public constructor() {
		super('djsdocs', {
			aliases: ['djsdocs', 'dd'],
			description: {
				content: 'Renvoie un embed de la documentation de djs',
				usage: '<query>',
				examples: ['TextChannel', 'Client#guildMemberAdd', 'Guild'],
			},
			category: 'docs',
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			userPermissions: ['SEND_MESSAGES'],
			args: [
				{
					id: 'query',
					prompt: {
						start: (message: Message) => `${message.author}, qu'est ce que vous cherchez?`,
					},
					match: 'content',
					type: (_, query) => (query ? encodeURIComponent(query.replace(/ /g, '-')) : null),
				}
			]
		});
	}

	public override async exec(message: Message, { query }: {query: string}) {
		message.delete();
		const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`);
		const embed = await res.json();
    // TODO: find a way to split embeds (split is gone) - Util.splitMessage?
    if (query == 'client') return message.channel.send('Recherche pas assez spécifique!');
		if (!embed) return message.reply('Erreur!');
    message.channel.send({ embeds: [embed] });
	}
}
