const tools = require('../tools');

module.exports = {
	name: 'purge',
	category: 'Moderation',
	aliases: ['delete', 'pu'],
	description: "Deletes multiple messages at once.",
	usage: '<amount>',
	requires: 'MANAGE_MESSAGES',
	minArgs: 1,
	guildOnly: true,
	async run(message, [amount]) {
		// Get the amount of messages to delete, max it out at 100.
		const msgs = Math.min(amount, 99);

		// Delete the messages.
		await message.channel.bulkDelete(msgs + 1)

		// Send a confirmation and delete it after 1 second.
		const embed = tools.embed('Success')
		.setDescription(`Deleted ${msgs} messages`);
		const reply = await message.channel.send(embed);
		reply.delete({timeout: 1000});
	}
}