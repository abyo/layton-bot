const {getQueryParentName} = require("./query");
function getParent(json, query) {
  const parentName = getQueryParentName(query);
  const parent = json.classes.find(clase => clase.name === parentName) || json.typedefs.find(typedef => typedef.name === parentName);
  return parent;
}

module.exports = { getParent };