const tools = require('../tools');

module.exports = {
	name: 'eval',
	category: 'Owner Only',
	aliases: ['ev'],
	description: "Runs JavaScript code.",
	usage: '<code ...>',
	cooldown: 0,
	ownerOnly: true,
	async run(message, args) {
		return tools.embed('Success')
		.setDescription(eval(args.join(' ')));
	}
}