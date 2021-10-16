import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

const clean = (text: string) => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

export default class EvalCommand extends Command {
	public constructor() {
		super('eval', {
			aliases: ['eval'],
			category: 'admin',
      ownerOnly: true,
      channel: 'guild',
			description: {
				content: 'Evaluate code (for owner only).',
				usage: 'eval <code>',
				examples: ['eval 2+2']
			},
			args: [
        {
          id: 'code',
          match: 'content',
        },
      ]
		});
	}

	public override async exec(message: Message, { code }: { code: string }): Promise<void> {
    try {
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
	}
}
