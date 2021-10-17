import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Intents,	Message, Snowflake } from 'discord.js';
import { Config } from './Config';
import path from 'path';

declare global { var client: LaytonClient; }

export class LaytonClient<Ready extends boolean = boolean> extends AkairoClient<Ready> {
	public config: Config;
	public listenerHandler: ListenerHandler;
	public commandHandler: CommandHandler;
	public declare ownerID: Snowflake[];

	public constructor(config: Config) {
		super({
			ownerID: config.owners,
			intents: Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0),
			presence: {
				activities: [{ name: 'with a6yo', type: 'PLAYING' }],
				status: 'dnd'
			}
		});

		this.token = config.token;
		this.config = config;

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, '..', 'listeners'),
			automateCategories: true
		});

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands'),
			prefix: this.config.prefix,
			allowMention: true,
			handleEdits: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			argumentDefaults: {
				prompt: {
					start: 'If you see this, contact a6yo#4744.',
					retry: 'If you see this, contact a6yo#4744.',
					modifyStart: (_: Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
					modifyRetry: (_: Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
					timeout: 'You took too long the command has been cancelled',
					ended: 'You exceeded the maximum amount of tries the command has been cancelled',
					cancel: 'The command has been cancelled',
					retries: 3,
					time: 3e4
				},
				otherwise: ''
			},
			automateCategories: false,
			autoRegisterSlashCommands: true,
			skipBuiltInPostInhibitors: false,
			useSlashPermissions: true
		});
	}

	async #init(): Promise<void> {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.ignorePermissions = this.config.owners;
		this.commandHandler.ignoreCooldown = this.config.owners;
		this.listenerHandler.setEmitters({
			client: this,
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
	}

	public async start(): Promise<void> {
		global.client = this;

		try {
			await this.#init();
			await this.login(this.token!);
		} catch (e) {
			await console.error('Cannot start!', e);
		}
	}
}