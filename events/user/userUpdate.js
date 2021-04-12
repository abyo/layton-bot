module.exports = async (client, oldUser, newUser) => {
  if (!oldUser || !newUser || oldUser.bot) {
    return;
  } else {
    let gcknHelpguild = await client.guilds.cache.get("810091118401552395");
    let newMember = await gcknHelpguild.member(newUser);
  }
};
