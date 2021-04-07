module.exports = (client, oldPresence, newPresence) => {
  if (!oldPresence || !newPresence || oldPresence.user.bot) {
    return;
  } else {
    client.detectStatus(newPresence.member);
  }
};
