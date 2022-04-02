const axios = require("axios");
const Logger = require("../Logger");

// Return type of the query (parent, method/prop)
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
function getParent(json, query) {
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

function resolveMethodOrPropOrEvent(parent, query) {
  const name = getQueryParamName(query);
  const methodOrProp = parent.methods?.find(m => m.name === name) || parent.props?.find(p => p.name === name) || parent.events?.find(p => p.name === name);
  return methodOrProp;
}

function fetchGithub(toFetch){
  toFetch.forEach(async (f) => {
    const res = await axios.get(f.url);
    f.data = res.data;
  });
  Logger.info("Github fetched");
  return toFetch;
}


const {buildClassOrTypedefEmbed, buildMethodOrPropEmbed} = require("./embeds");

module.exports = {
  getQueryType, 
  buildClassOrTypedefEmbed, 
  buildMethodOrPropEmbed, 
  getParent,
  resolveMethodOrPropOrEvent, 
  getQueryParentName,
  getQueryParamName,
  fetchGithub
};