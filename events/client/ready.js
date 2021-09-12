module.exports = client => {
  let activities = ['avec a6yo', 'avec la modération', 'à vous espionner', 'à lire la documentation'], i = 0;

  setInterval(() => client.user.setPresence({ activity: { name: `${activities[i++ % activities.length]}`, type: 'PLAYING' }, status: 'dnd' }), 50000);
}