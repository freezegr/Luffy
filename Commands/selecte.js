const Command = require("../Structures/Command.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const System = require("../Structures/system.js");

module.exports = new Command({
  name: "slected",
  description: "Shows an embed",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
      if(args.slice(1).length == 0) return;
      let name = args.slice(1).join(" ")
      const system = new System()
      const characters = system.findCharacter(message.guild, message.author, name)
      
	  let pages = [];
	  
      await characters.forEach(x => {
		pages.push({
          label: x.name,
          description: `level: ${x.level.level} | xp ${x.level.xp}`,
          value: x.id,
		})
      });
	  
	  const row = new MessageActionRow()
	    .addComponents(
		  new MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('selecte character')
			.setMaxValues(1)
			.addOptions(pages)
	    );
		
      const filter = (interactions) => interactions.isSelectMenu() && interactions.user.id == message.author.id;
	  const collector = message.channel.createMessageComponentCollector({
	    filter,
		max: 1,
		time: 30000 
	  })
	  
	  collector.on('collect', collected => {
        const value = collected.values[0]
		system.selected(message.guild, message.author, value)
		collected.deferUpdate();
	  });
	  
	  collector.on('end', collected => {
	    //nothing
      });

	  await message.channel.send({ content: 'Select a character', components: [row] });
	  
	  // console.log(system.getUser(message.guild, message.author))
	  // message.channel.send('lel')
  }
});
