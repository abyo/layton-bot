import { Command } from 'discord-akairo';
import { stripIndents } from 'common-tags';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpCommand extends Command {
	public constructor() {
		super('help', {
			aliases: ['help'],
			description: {
				content:
					'Renvoie une liste des commandes disponibles, ou bien les informations sur une commande spécifique.',
				usage: '[command]',
			},
			category: 'utils',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					id: 'command',
					type: 'commandAlias',
				},
			],
		});
	}

	public override async exec(message: Message, { command }: { command: Command }) {
		message.delete();
		const prefix = client.config.prefix;
		if (!command) {
			const embed = new MessageEmbed().setColor('#36393F').addField(
				'Commandes',
				stripIndents`Une liste des commandes triées par catégories.
        Pour plus d'informations, tapez \`${prefix}help <command>\``,
			);

			for (const category of this.handler.categories.values()) {
				if (category.id == 'admin' || category.id == 'embed') continue;
				if (category.id == 'moderation' && !message.member!.roles.cache.some(r => r.name == 'Modérateur')) continue;
				embed.addField(
					`${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`,
					`${category
						.filter(cmd => cmd.aliases.length > 0)
						.map(cmd => `\`${cmd.aliases[0]}\``)
						.join(', ')}`,
				);
			}

			return message.util!.send({ embeds: [embed] });
		}

		const embed = new MessageEmbed()
			.setColor('#36393F')
			.setTitle(
				`\`${command.aliases[0]} ${
					command.description.usage ? command.description.usage : ''
				}\``,
			)
			.addField('Description', command.description.content || '\u200b');

		if (command.aliases.length > 1)
			embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);

		if (command.description.examples && command.description.examples.length)
			embed.addField(
				'Exemples',
				`\`${command.aliases[0]} ${command.description.examples.join(
					`\`\n\`${command.aliases[0]} `,
				)}\``,
				true,
			);

		return message.util!.send({ embeds: [embed] });
	}
}
