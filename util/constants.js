const MESSAGES = {
  COMMANDS: {
    MISC: {
      HELP: {
        name: "help",
        aliases: ['help'],
        category: 'misc',
        description: "Renvoie une liste de commandes ou les informations sur une seule!",
        cooldown: 3,
        usage: '<command_name>',
        isUserAdmin: false,
        permissions: false,
        args: false
      },
    },
    MODERATION: {
      BAN: {
        name: "ban",
        aliases: ['ban'],
        category: 'moderation',
        description: "Ban un utilisateur",
        cooldown: 1,
        usage: '<@user> <raison>',
        isUserAdmin: true,
        permissions: true,
        args: true
      },
      KICK: {
        name: "kick",
        aliases: ['kick'],
        category: 'moderation',
        description: "Kick un utilisateur",
        cooldown: 1,
        usage: '<@user> <raison>',
        isUserAdmin: true,
        permissions: true,
        args: true
      },
      MUTE: {
        name: "mute",
        aliases: ['mute'],
        category: 'moderation',
        description: "Mute un utilisateur",
        cooldown: 1,
        usage: '<@user> <time>',
        isUserAdmin: true,
        permissions: true,
        args: true
      },
      PRUNE: {
        name: "prune",
        aliases: ['prune'],
        category: 'moderation',
        description: "Purge un nombre de message spécifié sur un utilisateur spécifié",
        cooldown: 1,
        usage: '<@user> <nbr_messages>',
        isUserAdmin: true,
        permissions: true,
        args: true
      },
      PURGE: {
        name: "purge",
        aliases: ['purge'],
        category: 'moderation',
        description: "Purge un nombre de message spécifié",
        cooldown: 1,
        usage: '<nbr_messages>',
        isUserAdmin: false,
        permissions: true,
        args: true
      },
      REDIRECT: {
        name: "redirect",
        aliases: ['redirect', 'rdct'],
        category: 'moderation',
        description: "Redirige un message d'un salon à un autre et notifie l'utilisateur",
        cooldown: 1,
        usage: '<message_id> <#salon_de_redirection>',
        isUserAdmin: false,
        permissions: true,
        args: true
      },
      WARN: {
        name: "warn",
        aliases: ['warn'],
        category: 'moderation',
        description: "Avertir un utilisateur et le message",
        cooldown: 1,
        usage: '<@user> [<message_id>] [<raison>]',
        isUserAdmin: true,
        permissions: true,
        args: true
      },
      UNBAN: {
        name: "unban",
        aliases: ['unban'],
        category: 'moderation',
        description: "Unban un utilisateur",
        cooldown: 1,
        usage: '<user_id>',
        isUserAdmin: false,
        permissions: true,
        args: true
      },
      UNMUTE: {
        name: "unmute",
        aliases: ['unmute'],
        category: 'moderation',
        description: "Unmute un utilisateur",
        cooldown: 1,
        usage: '<@user>',
        isUserAdmin: false,
        permissions: true,
        args: true
      }
    },
  }
}

exports.MESSAGES = MESSAGES;