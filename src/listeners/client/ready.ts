import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			type: 'on'
		});
	}

	public override async exec(): Promise<void> {
		void console.log('Ready ->', `Logged in to ${client.user?.tag} serving ${client.users.cache.size} users.`);
	}
}
