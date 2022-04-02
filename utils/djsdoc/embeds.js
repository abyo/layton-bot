const {MessageEmbed} = require("discord.js");

function normalizeJSDoc(str) {
  return str.replace(/\{@link\s([^}]+)\}/g, "$1").replace("\n", " ");
}
function arraysToStr(arr, join=""){
  let str = "";
  arr.forEach(a => {
    if(Array.isArray(a)) {
      str += arraysToStr(a, join);
    } else str += a + join;
  });
  return str;
}
function removeLastChar(str) {
  return str.substring(0, str.length - 1);
}
function normalizeStr(str) {
  return str.replace(/<info>|<\/info>/g, "");
}
function buildGeneralEmbed(parent, meta) {
  let description = "";
  if(parent.description) description += `**Description:** ${normalizeJSDoc(parent.description)}`;
  if(parent.props?.length) {
    description += "\n\n**Properties:**\n";
    parent.props.forEach((p, index)=> {
      description += `\`${p.name}\`${index+1 < parent.props.length ? "," : ""}`;
    });
  }
  if(parent.methods?.length) {
    description += "\n\n**Methods:**\n";
    parent.methods.forEach((m, index) => {
      description += `\`${m.name}\`${index+1 < parent.methods.length ? "," : ""}`;
    });
  }
  if(parent.events?.length) {
    description += "\n\n**Events:**\n";
    parent.events.forEach((e, index) => {
      description += `\`${e.name}\`${index+1 < parent.events.length ? "," : ""}`;
    });
  }
  console.log(parent.meta);
  if(parent.meta) description += `\n\n[Source code](${meta.github + parent.meta.path + "/" + parent.meta.file + "#L" + parent.meta.line})`;
  description = normalizeStr(description);
  const embed = new MessageEmbed()
    .setAuthor({name: parent.name, url: `${meta.doc}${parent.type}/${parent.name}`,iconURL: "https://cdn.discordapp.com/attachments/881988260925153322/959901484710002708/unknown.png"})
    .setDescription(description)
    .setColor(0x00AE86);
  return embed;
}

function buildSpecificEmbed(parent, child, meta) {
  let description = "";
  if(child.description) description += `**Description:** ${normalizeJSDoc(child.description)}`;
  if(child.params?.length) {
    description += "\n\n**Parameters:**\n";
    child.params.forEach(p => {
      description += `- \`${p.name}\`(${removeLastChar(arraysToStr(p.type, "|"))})${p.description ? "\n" + p.description : ""}`;
    });
  }
  if(child.returns?.length) {
    description += "\n**Returns:**\n";
    description += arraysToStr(child.returns, "");
  }
  if(child.examples?.length) {
    description += "\n**Examples:**\n";
    child.examples.forEach(e => {
      description += `\`\`\`js\n${e}\n\`\`\``;
    });
  }
  if(child.meta) description += `\n\n[Code source](${meta.github + child.meta.path + "/" + child.meta.file + "#L" + child.meta.line})`;
  description = normalizeStr(description);
  const embed = new MessageEmbed()
    //.setTitle(child.async ? `[async] ${parent.name + "#" + child.name}` : parent.name + "#" + child.name)
    .setAuthor({name: child.async ? `[async] ${parent.name + "#" + child.name}` : parent.name + "#" + child.name, url: `${meta.doc}${parent.type}/${parent.name}?scrollTo=${child.name}`,iconURL: "https://cdn.discordapp.com/attachments/881988260925153322/959901484710002708/unknown.png"})
    .setColor(0x00AE86)
    .setDescription(description);
  return embed;
}

module.exports = { buildGeneralEmbed, buildSpecificEmbed };


