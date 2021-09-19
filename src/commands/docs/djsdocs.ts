// @ts-nocheck
// TODO: Fix TS errors

import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import * as qs from 'querystring';

const SOURCES = ['stable', 'master', 'rpc', 'collection'];

interface DocsCommandArguments {
	source: string;
	force: boolean;
	includePrivate: boolean;
	query: string;
}

export default class DjsDocsCommand extends Command {
	public constructor() {
		super('djsdocs', {
			aliases: ['djsdocs', 'dd'],
			description: {
				content: 'Return DJS documentation embeds',
				usage: '<query>',
				examples: ['TextChannel', 'Client', 'ClientUser#setActivity --src=master'],
			},
			category: 'docs',
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			userPermissions: ['SEND_MESSAGES'],
			flags: ['--force', '-f', '--private', '-p'],
			optionFlags: ['--default=', '--src='],
		});
	}

  // 
	public *args() {
		const defaultDocs = yield {
			match: 'option',
			flag: '--default=',
		};

		const source = yield {
			match: 'option',
			flag: '--src=',
		};

		const force = yield {
			match: 'flag',
			flag: ['--force', '-f'],
		};

		const includePrivate = yield {
			match: 'flag',
			flag: ['--private', '-p'],
		};

		const query = yield {
			match: 'rest',
			type: 'lowercase',
			prompt: {
				start: (message: Message) => `${message.author}, what are you looking for?`,
				optional: defaultDocs ? true : false,
			},
		};

		return { defaultDocs, source, force, includePrivate, query };
	}

	public override async exec(message: Message, { source, force, includePrivate, query }: DocsCommandArguments) {
		message.delete();
		const q = query.split(' ');
		if (!SOURCES.includes(source)) source = 'stable';
		const queryString = qs.stringify({ src: source, q: q.join(' '), force, includePrivate });
		const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?${queryString}`);
		const embed = await res.json();
    // TODO: find a way to split embeds (split is gone) - Util.splitMessage?
    if (query == 'client') return message.channel.send('Recherche pas assez spécifique!');
		if (!embed) return message.reply('erreur!');
    message.channel.send({ embeds: [embed] });
	}
}
