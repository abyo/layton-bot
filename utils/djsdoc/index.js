const axios = require("axios");
const Logger = require("../Logger");
const { getQueryType, getQueryParentName, getQueryParamName } = require("./query");
const { getParent } = require("./parent");
const { buildGeneralEmbed, buildSpecificEmbed } = require("./embeds");

function resolveMethodOrPropOrEvent(parent, query) {
  const name = getQueryParamName(query);
  const methodOrProp = parent.methods?.find(m => m.name === name) || parent.props?.find(p => p.name === name) || parent.events?.find(p => p.name === name);
  return methodOrProp;
}

function fetchGithub(toFetch) {
  toFetch.forEach(async (f) => {
    const res = await axios.get(f.url);
    f.data = res.data;
    const search = getSearch(res.data);
    f.search = search[0];
    f.classes = search[1];
    f.typedefs = search[2];
  });
  Logger.info("Github fetched");
  return toFetch;
}

function getSearch(json) {
  const results = [];
  const classes = [];
  const typedefs = [];
  if (json.classes) {
    json.classes.forEach(c => {
      results.push(c.name);
      if (c.props) {
        c.props.forEach(p => {
          results.push(`${c.name}.${p.name}`);
          classes.push(c.name);
        });
      }
      if (c.methods) {
        c.methods.forEach(m => {
          results.push(`${c.name}#${m.name}`);
        });
      }
      if (c.events) {
        c.events.forEach(m => {
          results.push(`${c.name}#${m.name}`);
        });
      }
    });
    if (json.typedefs) {
      json.typedefs.forEach(c => {
        results.push(c.name);
        typedefs.push(c.name);
        if (c.props) {
          c.props.forEach(p => {
            results.push(`${c.name}.${p.name}`);
          });
        }
      });
    }
  }
  return [results, classes, typedefs];
}

module.exports = {
  getQueryType,
  buildGeneralEmbed,
  buildSpecificEmbed,
  getParent,
  resolveMethodOrPropOrEvent,
  getQueryParentName,
  getQueryParamName,
  fetchGithub
};
