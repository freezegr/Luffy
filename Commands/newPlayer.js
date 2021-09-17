const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const System = require("../Structures/system.js");

module.exports = new Command({
  name: "new-player",
  description: "Shows an embed",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
      const system = new System()
      system.newPlayer(message.guild, message.author)
	  console.log(system.getUser(message.guild, message.author))
	  message.channel.send('lel')
  }
});
