const {MessageEmbed} = require("discord.js");


function arraysToStr(arr, join=""){
  let str = "";
  arr.forEach(a => {
    if(Array.isArray(a)) {
      str += arraysToStr(a, join);
    } else {
      str += a + join;
    }
  });
  return str;
}
function removeLastChar(str) {
  return str.substring(0, str.length - 1);
}
function normalizeStr(str) {
  return str.replace(/<info>|<\/info>/g, "");
}
function buildClassOrTypedefEmbed(parent, meta) {
  let description = parent.description ;
  if(parent.props.length) {
    description += "\n**Properties:**\n";
    parent.props.forEach(p => {
      description += `\`${p.name}\`,`;
    });
  }
  if(parent.methods?.length) {
    description += "\n\n**Methods:**\n";
    parent.methods.forEach(p => {
      description += `\`${p.name}\`,`;
    });
  }
  if(parent.meta) description += `\n\n[Code source](${meta.github + parent.meta.path + "/" + parent.meta.file + "#L" + parent.meta.line})`;
  description = normalizeStr(description);
  const embed = new MessageEmbed()
    .setTitle(parent.name)
    .setDescription(description)
    .setColor(0x00AE86)
    .setThumbnail(parent.icon);
  return embed;
}

function buildMethodOrPropEmbed(methodOrProp, meta) {
  let description = methodOrProp.description + "\n";
  if(methodOrProp.params) {
    description += "\n**Parameters:**\n";
    methodOrProp.params.forEach(p => {
      description += `- \`${p.name}\`(${removeLastChar(arraysToStr(p.type, "|"))})\n${p.description}\n\n`;
    });
  }
  if(methodOrProp.returns?.length) {
    description += "\n**Returns:**\n";
    description += arraysToStr(methodOrProp.returns, "", "");
  }
  if(methodOrProp.examples?.length) {
    description += "\n**Examples:**\n";
    methodOrProp.examples.forEach(e => {
      description += `\`\`\`js\n${e}\n\`\`\``;
    });
  }
  if(methodOrProp.meta) description += `\n\n[Code source](${meta.github + methodOrProp.meta.path + "/" + methodOrProp.meta.file + "#L" + methodOrProp.meta.line})`;
  description = normalizeStr(description);
  const embed = new MessageEmbed()
    .setTitle(methodOrProp.async ? `[async] ${methodOrProp.name}` : methodOrProp.name)
    .setDescription(methodOrProp.description)
    .setColor(0x00AE86)
    .setThumbnail(methodOrProp.icon)
    .setDescription(description);
  
  return embed;
}

module.exports = { buildClassOrTypedefEmbed, buildMethodOrPropEmbed };