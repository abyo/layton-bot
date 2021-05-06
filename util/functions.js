const fs = require("fs");

let warningMessagePubStatus = (member, sendInGuild = Boolean(true)) => {
  let newMemberDisplayName = member.displayName.replace(/^[^a-zA-Z0-9]+/gi, "");
  if (newMemberDisplayName.length == 0) {
    newMemberDisplayName = "Placeholder";
  }

  return sendInGuild //si on doit l'envoyer dans la guild alors on adapte le message pour être sûr que l'utilisateur reçoive le message
    ? `Hello ${member} c'est moi Bernard,\nJe t'envoie ce message car mes esclaves humains ont vu que tu avais une pub dans le statut et un caractère spécial pour remonter en haut de la liste des membres.\nDu coup je t'ai renommé \`${newMemberDisplayName}\`. Tu peux rechanger ton surnom mais attention à ta pub, si tu ne l'enlèves pas avant de remettre ton ancien pseudo cela sera détecté et tu seras noté en tant que personne à bannir rapidement...\n||Surtout que certains sont impatient et adorent ban les gens sur ce serveur||\nAprès moi je dis ça je dis rien hein...`
    : `Hello c'est moi Bernard,\nJe t'envoie ce mp car mes esclaves humains ont vu que tu avais une pub dans le statut et un caractère spécial pour remonter en haut de la liste des membres.\nDu coup je t'ai renommé \`${newMemberDisplayName}\`. Tu peux rechanger ton surnom mais attention à ta pub, si tu ne l'enlèves pas avant de remettre ton ancien pseudo cela sera détecté et tu seras noté en tant que personne à bannir rapidement...\n||Surtout que certains sont impatient et adorent ban les gens sur ce serveur||\nAprès moi je dis ça je dis rien hein...`;
};

module.exports = (client) => {
  client.detectStatus = async (member) => {
    let bdd = await JSON.parse(await fs.readFileSync("./bdd_pub.json"));
    const status = member.presence.activities[0];
    if (status && status.type === "CUSTOM_STATUS") {
      //détecte le custom status
      if (!status.state) {
        return;
      }
      const statusValues = status.state.split(/ +/);
      for await (const value of statusValues) {
        // on test chaque "mot" dans le status
        if (!value.match("dsc.bio/")) {
          //permet d'autoriser les liens dcs.bio
          if (
            value.match(
              /(discord)?\.gg\/.+|http(s)?:\/\/.+\.(com|fr|ru|xyz|ptdr|net|be|ch|es)|w{3}\..+\.(com|fr|ru|xyz|ptdr|net|be|ch|es)|.+\.(com|fr|ru|xyz|ptdr|net|be|ch|es)/gm
            ) &&
            member.displayName.match(/^[^a-zA-Z0-9].+$/)
          ) {
            if (bdd.users.includes(member.user.id)) {
              console.log("users already had a pub warn");
              client.channels.fetch("812654959261777940").then((logChannel) => {
                logChannel.send(
                  `notre cher ${member.user} n'a pas compris la première fois et a remis une pub dans son statut...`
                );
                logChannel
                  .send("poke <@396233379890200579>") //ça c'est juste pour me ping et que je puisse ban des gens parce que j'ai ban personne pour l'instant
                  .then((m) => m.delete({ timeout: 1000 }));
              });
            } else {
              bdd.users.push(member.user.id);
              fs.writeFileSync("./bdd_pub.json", JSON.stringify(bdd, null, 4));
              let newNickname = member.displayName.replace(
                /^[^a-zA-Z0-9]+/gi,
                ""
              );
              member.setNickname(
                newNickname.length != 0 ? newNickname : "Placeholder"
              );
              member.user
                .send(warningMessagePubStatus(member, false))
                .catch((e) => {
                  //envoie le message dans le salon #bot-commands si les mp avec l'utilisateur sont désactivés
                  client.channels
                    .fetch("812757333431550034")
                    .then((channel) =>
                      channel.send(warningMessagePubStatus(member, true))
                    );
                });
            }
            break;
          }
        }
      }
    }
  };
};
