const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const System = require("../Structures/system.js");

module.exports = new Command({
  name: "test",
  description: "Shows an embed",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
      const system = new System()
      system.newPlayer(message.author, (err) => {
	    if(err) return console.log(err)
	  });
      system.user(message.author)
  }
});
