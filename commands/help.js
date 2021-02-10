const tools = require('../tools');
const {categories} = require('../config.json');

module.exports = {
	name: 'help',
	category: 'Information',
	aliases: ['?'],
	description: "Shows the command list or command info.",
	usage: '[command]',
	async run(message, [commandName]) {
		if (commandName) {
			// If a command was specified, find the command's info.
			const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			// If no command was found, exit.
			if (!command) throw new Error('Invalid command');

			// Format the command's info into an embed.
			const embed = tools.embed(`${command.name} command`)
			let desc = '';
			if (command.aliases) desc += `**Aliases:** ${command.aliases.join(', ')}\n`;
			if (command.category) desc += `**Category:** ${command.category}\n`;
			if (command.description) desc += `**Description:** ${command.description}\n`;
			if (command.usage) desc += `**Usage:** ${command.usage}\n`;
			if (command.requires) desc += `**Requires:** ${command.requires}\n`;
			if (command.guildOnly) desc += `This command is guild only.\n`;
			if (command.ownerOnly) desc += `This command is owner only.`;

			// Send the embed.
			return embed.setDescription(desc);
		} else {
			// If no command was specified, show every command in a list.
			const embed = tools.embed(`Command List`)
			.setDescription("See a more detailed list [here](https://github.com/gtrxAC/gtrxBot/blob/master/README.md#command-list).");

			// Create a command list for each command category.
			categories.forEach(category => {
				let list = '';
				message.client.commands.forEach(command => {
					if (command.category != category) return;
					list += `**${command.name}:** ${command.description}\n`
				})
				embed.addField(category, list);
			})

			// Send the embed.
			return embed;
		}
	}
}