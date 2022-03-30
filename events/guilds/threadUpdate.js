module.exports = {
  name: "threadUpdate",
  once: false,
  async execute(client, oldThread, newThread) {
    if (oldThread.archived && !newThread.archived) newThread.join();
  },
};
