const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "joke",
    category: "misc",
    ownerOnly: false,
    usage: "joke",
    permissions: ["SEND_MESSAGES"],
    examples: ["joke"],
    description: "Faire une blague",
    options: [
        {
            name: "type",
            description: "Choisir le type de blague",
            type: "STRING",
            choices: [
                {
                    name: 'Aléatoire',
                    value: 'random'
                },
                {
                    name: 'Tout public',
                    value: 'global'
                },
                {
                    name: 'Humour Noir',
                    value: 'dark'
                },
                {
                    name: 'Blague de dev',
                    value: 'dev'
                },
                {
                    name: 'Blague beauf',
                    value: 'beauf'
                },
                {
                    name: 'Blondes',
                    value: 'blondes'
                },
            ],
            required: true
        }
    ],

    async runInteraction(client, interaction, guildSettings) {
        // Mettre un TOKEN
        const jokeAPI = new BlaguesAPI('')
        let type;
        let joke;
        let answer;

        switch (interaction.options.getString('type')) {
            case 'random':
                let blagueRan = await jokeAPI.random({
                    disallow: [
                      blagues.categories.LIMIT
                    ]
                  });
                type = blagueRan.type;
                joke = blagueRan.joke;
                answer = blagueRan.answer;
                break;

            case 'global':
                let blagueGlob = await jokeAPI.randomCategorized(
                    jokeAPI.categories.GLOBAL
                );
                type = blagueGlob.type;
                joke = blagueGlob.joke;
                answer = blagueGlob.answer;
                break;

            case 'dark':
                let blagueDark = await jokeAPI.randomCategorized(
                    jokeAPI.categories.DARK
                );
                type = blagueDark.type;
                joke = blagueDark.joke;
                answer = blagueDark.answer;
                break;

            case 'dev':
                let blagueDev = await jokeAPI.randomCategorized(
                    jokeAPI.categories.DEV
                );
                type = blagueDev.type;
                joke = blagueDev.joke;
                answer = blagueDev.answer;
                break;

            case 'beauf':
                let blagueBeauf = await jokeAPI.randomCategorized(
                    jokeAPI.categories.BEAUF
                );
                type = blagueBeauf.type;
                joke = blagueBeauf.joke;
                answer = blagueBeauf.answer;
                break;

            case 'blondes':
                let blagueBlondes = await jokeAPI.randomCategorized(
                    jokeAPI.categories.BLONDES
                );
                type = blagueBlondes.type;
                joke = blagueBlondes.joke;
                answer = blagueBlondes.answer;
                break;
        }

        const embed = new MessageEmbed()
            .setColor('#dc143c')
            .setTitle('Joke!')
            .setDescription(`${joke} \n ||${answer}||`)
            .setFooter({ text: type, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed] });
    },
};
