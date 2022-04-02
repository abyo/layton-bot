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

module.exports = {
  getQueryType,
  getQueryParentName,
  getQueryParamName
};