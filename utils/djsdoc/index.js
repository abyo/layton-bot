const {MessageEmbed} = require("discord.js");

// Return class from .json find by name
const json = require("./doc.json");
function getClass(name) {
  return json.clases.find(clase => clase.name === name);
}
function buildClassEmbed(classInfos) {
  let description = "**Properties:**\n";
  classInfos.props.forEach(p => {
    description += `\`${p.name}\`,`;
  });
  description += "\n**Methods:**\n";
  classInfos.methods.forEach(p => {
    description += `\`${p.name}\`,`;
  });
  const embed = new MessageEmbed()
    .setTitle(classInfos.name)
    .setDescription(classInfos.description)
    .setColor(0x00AE86)
    .setThumbnail(classInfos.icon)
    .setDescription(description);
  
  return embed;
}
function buildTypedefsEmbed(typedefInfos) {
  const embed = new MessageEmbed()
    .setTitle(typedefInfos.name)
    .setDescription(typedefInfos.description)
    .setColor(0x00AE86)
    .setThumbnail(typedefInfos.icon)
    .setDescription(typedefInfos.description);
  if(typedefInfos.props || typedefInfos.methods) {
    let description = "**Properties:**\n";
    typedefInfos.props.forEach(p => {
      description += `\`${p.name}\`,`;
    });
    description += "\n**Methods:**\n";
    typedefInfos.methods.forEach(p => {
      description += `\`${p.name}\`,`;
    });
    embed.setDescription(description);
  }
  return embed;
}
function buildMethodEmbed(methodInfos) {
  const embed = new MessageEmbed()
    .setTitle(methodInfos.name)
    .setDescription(methodInfos.description)
    .setColor(0x00AE86)
    .setThumbnail(methodInfos.icon)
    .setDescription(methodInfos.description);
  if(methodInfos.params) {
    let description = "**Parameters:**\n";
    methodInfos.params.forEach(p => {
      description += `\`${p.name}\`,`;
    });
    embed.setDescription(description);
  }
  return embed;
}
function buildPropEmbed(propInfos) {
  const embed = new MessageEmbed()
    .setTitle(propInfos.name)
    .setDescription(propInfos.description)
    .setColor(0x00AE86)
    .setThumbnail(propInfos.icon)
    .setDescription(propInfos.description);
  return embed;
}

module.exports = { getClass, buildClassEmbed, buildTypedefsEmbed, buildMethodEmbed, buildPropEmbed };