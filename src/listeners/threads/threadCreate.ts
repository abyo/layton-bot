import { Listener } from 'discord-akairo';
import { ThreadChannel } from 'discord.js';

export default class ThreadCreateListener extends Listener {
	public constructor() {
		super('threadCreate', {
			emitter: 'client',
			event: 'threadCreate',
      category: 'guild'
		});
	}

	public override async exec(thread: ThreadChannel): Promise<void> {
		if (thread.isText()) thread.join();
	}
}
