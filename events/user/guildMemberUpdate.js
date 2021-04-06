module.exports = (client, oldMember, newMember) => {
  if (!oldMember || !newMember || oldMember.user.bot) {
    return;
  } else {
    client.detectStatus(newMember);
  }
};
