module.exports = {
  name: "threadCreate",
  once: false,
  async execute(client, thread) {
    if (thread.isText()) thread.join();
  },
};
