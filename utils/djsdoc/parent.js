const {getQueryParentName} = require("./query");
function getParent(json, query) {
  const parentName = getQueryParentName(query);
  let parent;
  parent = json.classes.find(clase => clase.name === parentName);
  if(parent) {
    parent.type = "class";
    return parent;
  }
  parent = json.typedefs.find(typedef => typedef.name === parentName);
  if(parent) {
    parent.type = "typedef";
    return parent;
  }
  return parent;
}

module.exports = { getParent };