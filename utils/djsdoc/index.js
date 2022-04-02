const json = require("../../doc.json");

/**
 * Query example:
 * Message -> parent
 * Message#send -> method/prop
 * Message.content -> method/prop
 * ChannelData -> parent
 */
// Return type of the query (classe, method/prop)
function getQueryType(query) {
  if (query.includes("#") || query.includes(".")) return "method/prop";
  else return "parent";
}

function getQueryParentName(query){
  if(query.includes("#")) return query.split("#")[0];
  if(query.includes(".")) return query.split(".")[0];
  return query;
}
function getQueryParamName(query){
  if(query.includes("#")) return query.split("#")[1];
  if(query.includes(".")) return query.split(".")[1];
  return query;
}
function getParent(query) {
  const parentName = getQueryParentName(query);
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

function resolveMethodOrProp(parent, query) {
  const name = getQueryParamName(query);
  const methodOrProp = parent.methods.find(m => m.name === name) || parent.props.find(p => p.name === name);
  return methodOrProp;
}




const {buildClassOrTypedefEmbed, buildMethodOrPropEmbed} = require("./embeds");

module.exports = {getQueryType, buildClassOrTypedefEmbed, buildMethodOrPropEmbed, getParent, resolveMethodOrProp, getQueryParentName, getQueryParamName};