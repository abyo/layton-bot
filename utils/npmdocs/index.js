const { get } = require("axios");
const { MessageEmbed } = require("discord.js");
function getInfosFromJson(json) {
  const latest = json.versions[json["dist-tags"]["latest"]]
  const obj = {
    name: json["name"],
    activesVersions: [],
    latest: {
      version: latest.version,
      description: latest.description || "Aucune description",
      author: latest.contributors?.map(c => c.name || c).join(", ") || latest.maintainers?.map(c => c.name || c).join(", ") || "Aucun auteur",
      license: latest.license,
      keywords: latest.keywords,
      homepage: latest.homepage,
      distTar: latest.dist.tarball,
      fileCount: latest.fileCount,

    }
  }
  for (const activeVersion in json["dist-tags"]) {
    obj.activesVersions.push({
      tag: activeVersion,
      version: activeVersion["version"]
    });
  }
  return obj;
}

async function fetchPackage(name) {
  try {
    const responce = await get(`https://registry.npmjs.com/${name}`)
    const json = await responce.data;
    return json;
  } catch (e) {
    console.log(e)
    return null;
  }
}
function trimstr(arr) {
  if (arr.length > 20) arr = arr.slice(0, 20) + "..."
  return arr;
}
async function buildEmbed(data) {
  const embed = new MessageEmbed()
    .setAuthor({ name: data.name, iconURL: "https://cdn.discordapp.com/attachments/988759911242539068/988759932545400832/unknown.png", url: `https://npmjs.com/${data.name}` })
    .setColor("#cc3534")
    .setDescription(`❯ Description: ${data.latest.description}\n❯ Mots clés: ${data.latest.keywords}\n❯ Tags: ${data.activesVersions.map(a => a.tag).join(',')}\n\`\`\`npm install ${data.name}\nyarn add ${data.name}\`\`\``)
    .addFields([
      { name: "Version", value: data.latest.version, inline: true },
      { name: "Author(s)/Mainteneurs", value: trimstr(data.latest.author), inline: true },
      { name: "License", value: data.latest.license, inline: true },
    ])
  return embed;
}

module.exports = {
  getInfosFromJson,
  fetchPackage,
  buildEmbed
}
