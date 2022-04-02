const {MessageEmbed} = require("discord.js");

// function arraysToStr(structure, join="") {
//   let str = "";
//   structure.forEach(s => {
//     if(Array.isArray(s)) {
//       str += arraysToStr(s, join);
//     }

//   });
//   return str;
// }
function arraysToStr(arr, join=""){
  let str = "";
  arr.forEach(a => {
    if(Array.isArray(a)) {
      str += arraysToStr(a, "|");
    } else {
      str += a + join;
    }
  });
  return str;
}

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

function buildMethodOrPropEmbed(methodOrProp) {
  let description = methodOrProp.description + "\n";
  if(methodOrProp.params) {
    description += "\n**Parameters:**\n";
    methodOrProp.params.forEach(p => {
      description += `\`${p.name}\`(${arraysToStr(p.type, "|")}),`;
    });
  }
  if(methodOrProp.returns?.length) {
    description += "\n**Returns:**\n";
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

module.exports = { buildClassOrTypedefEmbed, buildMethodOrPropEmbed };