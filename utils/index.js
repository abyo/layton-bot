exports.hasHelperOrModoPerms = (member) => {
  if(!member.roles.cache.has([process.env.MODO_ROLE, process.env.HELPER_ROLE])) return true;
  return false;
};