import { Listener } from 'discord-akairo';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';

export default class GuildMemberAddListener extends Listener {
	public constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			event: 'guildMemberAdd',
			category: 'guild'
		});
	}

	public override async exec(member: GuildMember): Promise<void> {
		const welcome = client.channels.cache.get(client.config.channels.member) as TextChannel | undefined;
		const embed = new MessageEmbed()
			.setDescription(`**${member.user.tag}** a rejoint le serveur. Nombre de membres: ${member.guild.memberCount}.`)
      // TODO: CONSTANT -> Move colors to separate file for re-use
			.setColor("#4dff76");

    // TODO: LOGGER -> logs whenever logger is created
		await welcome!.send({ embeds: [embed] }).then(_ => console.log(`guildMemberAdd -> Sent a message for ${member.user.tag}.`))
    .catch(_ => console.log(`guildMemberAdd -> Failed to send message for ${member.user.tag}.`));
	}
}

