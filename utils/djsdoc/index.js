const {MessageEmbed} = require("discord.js");
const json = require("../../doc.json");

/**
 * Query example:
 * Message -> parent
 * Message#send -> method
 * Message.content -> prop
 * ChannelData -> parent
 */
// Return type of the query (classe, method, prop)
function getQueryType(query) {
  if (query.includes("#")) {
    return "method/prop";
  } else if (query.includes(".")) {
    return "method/prop";
  } else {
    return "parent";
  }
}

function getParentName(query){
  return query.split(".")[0].split("#")[0];
}
function getParent(query) {
  const parentName = getParentName(query);
  const parent = json.classes.find(clase => clase.name === parentName) || json.typedefs.find(typedef => typedef.name === parentName);
  return parent;
}


// function buildClassEmbed(classInfos) {
//   let description = "**Properties:**\n";
//   classInfos.props.forEach(p => {
//     description += `\`${p.name}\`,`;
//   });
//   description += "\n**Methods:**\n";
//   classInfos.methods.forEach(p => {
//     description += `\`${p.name}\`,`;
//   });
//   const embed = new MessageEmbed()
//     .setTitle(classInfos.name)
//     .setDescription(classInfos.description)
//     .setColor(0x00AE86)
//     .setThumbnail(classInfos.icon)
//     .setDescription(description);
  
//   return embed;
// }
function buildClassOrTypedefEmbed(parent) {
  let description = parent.description;
  if(parent.props.length) {
    description += "**Properties:**\n";
    parent.props.forEach(p => {
      description += `\`${p.name}\`,`;
    });
  }
  if(parent.methods?.length) {
    description += "\n**Methods:**\n";
    parent.methods.forEach(p => {
      description += `\`${p.name}\`,`;
    });
  }
  const embed = new MessageEmbed()
    .setTitle(parent.name)
    .setDescription(description)
    .setColor(0x00AE86)
    .setThumbnail(parent.icon);
  return embed;
}
function resolveMethodOrProp(parent, query) {
  const name = query.split(".")[1] || query.split("#")[1];
  const methodOrProp = parent.methods.find(m => m.name === name) || parent.props.find(p => p.name === name);
  return methodOrProp;
}
function buildMethodOrPropEmbed(methodOrProp) {
  let description = methodOrProp.description + "\n\n";
  if(methodOrProp.params) {
    description += "**Parameters:**\n";
    methodOrProp.params.forEach(p => {
      description += `\`${p.name}\`(${arraysToStr(p.type)}),`;
    });
    embed.setDescription(description);
  }
  if(methodOrProp.returns) {
    description += "**Returns:**\n";
    arraysToStr(methodOrProp.returns);
  }
  const embed = new MessageEmbed()
    .setTitle(methodOrProp.name)
    .setDescription(methodOrProp.description)
    .setColor(0x00AE86)
    .setThumbnail(methodOrProp.icon)
    .setDescription(description);
  
  return embed;
}
// function buildPropEmbed(propInfos) {
//   const embed = new MessageEmbed()
//     .setTitle(propInfos.name)
//     .setDescription(propInfos.description)
//     .setColor(0x00AE86)
//     .setThumbnail(propInfos.icon)
//     .setDescription(propInfos.description);
//   return embed;
// }
function arraysToStr(structure) {
  let str = "";
  structure.forEach(s => {
    s.forEach(s2 => {
      str += s2.join("");
    });
    str += "\n";
  });
  return str;
}

module.exports = {getQueryType, buildClassOrTypedefEmbed, buildMethodOrPropEmbed, getParent, resolveMethodOrProp };