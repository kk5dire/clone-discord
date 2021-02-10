const tools = require('../tools');

module.exports = {
	name: 'ping',
	category: 'Information',
	aliases: ['pi'],
	description: "Checks the bot's latency to Discord.",
	async run(message, [test]) {
		// If -t was specified, test message actions.
		if (test == '-t') {
			// Check message send ping.
			const sendStart = Date.now();
			const reply = await message.channel.send("Checking ping... `message.edit`")
			const sendPing = Date.now() - sendStart;

			// Check message edit ping.
			const editStart = Date.now();
			await reply.edit("Checking ping... `message.delete`")
			const editPing = Date.now() - editStart;

			// Check message react ping.
			reply.edit("Checking ping... `message.react`")
			const reactStart = Date.now();
			await reply.react('✅')
			const reactPing = Date.now() - reactStart;

			// Check message delete ping.
			const deleteStart = Date.now();
			await reply.delete();
			const deletePing = Date.now() - deleteStart;

			// Send the results in an embed.
			return tools.embed('Test complete')
			.setDescription(
				`**Message Send:** ${sendPing} ms\n`+
				`**Message Edit:** ${editPing} ms\n`+
				`**Message React:** ${reactPing} ms\n`+
				`**Message Delete:** ${deletePing} ms\n\n`+
				`**Total:** ${sendPing + editPing + reactPing + deletePing} ms\n`
			)
		} else {
			// Otherwise just send the websocket ping.
			return tools.embed('Success')
			.setDescription(`${message.client.ws.ping} ms`);
		}
	}
}