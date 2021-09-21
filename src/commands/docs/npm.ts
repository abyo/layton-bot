import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class NpmCommand extends Command {
	public constructor() {
		super('npm', {
			aliases: ['npm'],
			category: 'docs',
			description: {
				content: 'Return NPM documentation embeds',
				usage: '<query>',
				examples: ['lodash', 'express'],
			},
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			userPermissions: ['SEND_MESSAGES'],
			args: [
				{
					id: 'pkg',
					prompt: {
						start: (message: Message) => `${message.author}, what are you looking for?`,
					},
					match: 'content',
					type: (_, pkg) => (pkg ? encodeURIComponent(pkg.replace(/ /g, '-')) : null),
				},
			],
		});
	}

	public override async exec(message: Message, { pkg }: { pkg: string }) {
		message.delete();
		const res = await fetch(`https://registry.npmjs.com/${pkg}`);
		if (res.status === 404) return message.util!.reply('Le bot n\'a pas trouvé ce que vous recherchez, essayer quelque chose qui existe!');
		const body = await res.json();
		const maintainers = this._trimArray(body.maintainers.map((user: { name: string }) => user.name));
		const embed = new MessageEmbed()
			.setColor('#dc143c')
			.setTitle(body.name)
			.setURL(`https://www.npmjs.com/package/${pkg.toLowerCase()}`)
			.setDescription(body.description || 'Aucune description.')
			.addField('❯ Version', body['dist-tags'].latest, true)
			.addField('❯ Auteur', body.author ? body.author.name : '???', true)
			.addField('❯ Mainteneurs', maintainers.join(', '));

		return message.util!.send({ embeds: [embed] });
	}

	private _trimArray(arr: string[]) {
		if (arr.length > 10) {
			const len = arr.length - 10;
			arr = arr.slice(0, 10);
			arr.push(`${len} more...`);
		}

		return arr;
	}
}
