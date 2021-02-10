const tools = require('../tools');

module.exports = {
	name: 'editsnipe',
	category: 'Utility',
	aliases: ['esn'],
	description: "Reveals the last edited message.",
	usage: '[#channel]',
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// Get the editsnipe data for the channel.
		const sniped = message.client.editSnipeMap.get(channel.id);

		// If nothing was found, exit.
		if (!sniped) throw new Error('No message found');

		// Send an embed with the editsnipe data.
		return tools.embed(`${sniped.author} said:`)
		.addField('Old Message', '\u200b' + sniped.oldContent)
		.addField('New Message', '\u200b' + sniped.newContent);
	}
}