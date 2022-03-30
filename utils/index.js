exports.hasHelperOrModoPerms = (member) => {
  const roles = [process.env.MODO_ROLE, process.env.HELPER_ROLE];
  for (const role of roles) { if (member.roles.cache.has(role)) return true; }
  return false;
};