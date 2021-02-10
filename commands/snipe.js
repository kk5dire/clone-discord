const tools = require('../tools');

module.exports = {
	name: 'snipe',
	category: 'Utility',
	aliases: ['sn'],
	description: "Reveals the last deleted message.",
	usage: '[#channel]',
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;

		// Get the snipe data for the channel.
		const sniped = message.client.snipeMap.get(channel.id);

		// If nothing was found, exit.
		if (!sniped) throw new Error('No message found');

		// Create an embed with the snipe data.
		const embed = tools.embed(`${sniped.author} said:`)
		.setDescription(sniped.content);

		// If the sniped message had an embed, add that to the output.
		if (sniped.embed) {
			let embedData = [];
			if (sniped.embed.title) embedData.push(`**${sniped.embed.title}**`);
			if (sniped.embed.description) embedData.push(sniped.embed.description);
			if (sniped.embed.footer) embedData.push(sniped.embed.footer.text);
			if (sniped.embed.image) embedData.push(`[Image](${sniped.embed.image.proxyURL})`);
			embed.addField('Embed', embedData.length ? `>>> ${embedData.join('\n')}` : '\u200b');
		}

		// If the sniped message had an image, add that to the embed.
		if (sniped.attachment) embed.description += `\n[Attachment](${sniped.attachment.proxyURL})`;

		// Send the embed.
		return embed.setTimestamp(sniped.ts);
	}
}