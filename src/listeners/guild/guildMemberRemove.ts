import { Listener } from 'discord-akairo';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';

export default class GuildMemberRemoveListener extends Listener {
	public constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
			event: 'guildMemberRemove',
			category: 'guild'
		});
	}

	public override async exec(member: GuildMember): Promise<void> {
		const welcome = client.channels.cache.get(client.config.channels.member) as TextChannel | undefined;
		const embed = new MessageEmbed()
			.setDescription(`**${member.user.tag}** a quitté le serveur. Nombre de membres: ${member.guild.memberCount}.`)
      // TODO: CONSTANT -> Move colors to separate file for re-use
			.setColor("#dc143c");

    // TODO: LOGGER -> logs whenever logger is created
		await welcome!.send({ embeds: [embed] }).then(_ => console.log(`guildMemberRemove -> Sent a message for ${member.user.tag}.`))
    .catch(_ => console.log(`guildMemberRemove -> Failed to send message for ${member.user.tag}.`));
	}
}

