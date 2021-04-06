module.exports = (client, oldPresence, newPresence) => {
  if (oldPresence.user.bot) {
    return;
  } else {
    client.detectStatus(newPresence.member);
  }
};
