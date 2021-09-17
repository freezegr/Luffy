const Event = require("../Structures/Event.js");

module.exports = new Event("ready", client => {
  console.log('I am ready!');
  
  let statuses = [
    "Made by freezeGr",
    "version 1.0.0 beta"
  ];
  
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "WATCHING"
    });
  }, 5000)
});