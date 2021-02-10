const tools = require('../tools');

module.exports = {
	name: 'random',
	category: 'Utility',
	aliases: ['rnd'],
	description: "Generates a random number.",
	usage: '<min> <max>',
	minArgs: 2,
	async run(message, [min, max]) {
		// Generate a random number.
		const number = Math.round(Math.random() * (max - min)) + Number(min);

		// Send an embed with the number.
		return tools.embed('Random Number')
		.setDescription(`**Range:** ${min}, ${max}\n**Result:** ${number}`);
	}
}