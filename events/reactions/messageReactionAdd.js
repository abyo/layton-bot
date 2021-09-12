const { Collection, MessageEmbed } = require('discord.js')

module.exports = async (_client, messageReaction, user) => {
    if (user.bot) return
    if (messageReaction.partial) await messageReaction.fetch()
    if (messageReaction.message.channel.id !== '812735790357938176') return
    if (['👍', '👎'].includes(messageReaction._emoji.name)) return

    const author = messageReaction.message.embeds[0].author.name.split(' ').pop().replace('(', '').replace(')', '')
    if (author === user.id && messageReaction._emoji.name === '🗑️') return messageReaction.message.delete().catch()
    if (['❌', '✅'].includes(messageReaction._emoji.name)) {
        const member = await messageReaction.message.guild.members.fetch(user.id)
        if (member.roles.cache.get('812048910344257566') || user.id==='520876241646125059') {
            if (messageReaction._emoji.name === '✅') {
                const suggestionToEdit = messageReaction.message.embeds[0];
                const acceptedSugestion = new MessageEmbed(suggestionToEdit)
                    .setTitle(`Suggestion acceptée par les modérateurs.`)
                    .setColor("#2ba0ff")
                    .setFooter("Cette suggestion sera mise en place prochainement.")
                messageReaction.message.edit({embeds: [acceptedSugestion]});
                return messageReaction.message.reactions.removeAll();
            }
            const message = await messageReaction.message.channel.send(`${user.toString()}, merci d'indiquer la raison du refus de la suggestion :`)
            const filter = (msg) => {
                if (msg.author.id === user.id) return true
                msg.delete().catch()
            }
            const collected = await messageReaction.message.channel.awaitMessages({filter: filter, max: 1, time: 20000}).catch(() => { return new Collection().set('0', {content: 'Aucune raison spécifiée.'}) })
            const suggestionToEdit = messageReaction.message.embeds[0];
            const refusedSugestion = new MessageEmbed(suggestionToEdit)
            .setTitle(`Suggestion refusée par les modérateurs.`)
            .setColor("#dc143c")
            .addField("Raison du refus : ", collected.first().content)
            .setFooter("Cette suggestion a été rejetée par le staff.")
            messageReaction.message.edit({embeds: [refusedSugestion]});
            collected.first().delete().catch()
            message.delete()
            return messageReaction.message.reactions.removeAll();
        }
    }
    messageReaction.users.remove(user)
}