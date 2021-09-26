import { Listener } from 'discord-akairo';
import { ThreadChannel } from 'discord.js';

export default class ThreadUpdateListener extends Listener {
	public constructor() {
		super('threadUpdate', {
			emitter: 'client',
			event: 'threadUpdate',
      category: 'guild'
		});
	}

	public override async exec(oldThread: ThreadChannel, newThread: ThreadChannel): Promise<void> {
		try { if (oldThread.archived && !newThread.archived) newThread.join()
    } catch(e) { console.log(e) }
	}
}
