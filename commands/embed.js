const tools = require('../tools');

module.exports = {
	name: 'embed',
	category: 'Utility',
	aliases: ['emb'],
	description: "Creates a simple embed message.",
	usage: '<title> ; [description] ; [footer] ; [image url]',
	minArgs: 1,
	async run(message, args) {
		// Separate the arguments by ; and get its components.
		let [title, description, footer, image] = args.join(' ').split(';');

		// If no image was specified, use the attachments.
		if (!image && message.attachments.size) image = message.attachments.first().proxyURL;

		// Delete the command message with a small delay so the embed image shows up.
		message.delete({timeout: 500});

		// Create the embed.
		const embed = tools.embed(title)
		if (description) embed.setDescription(description);
		if (footer) embed.setFooter(footer);
		if (image) embed.setImage(image);

		// And send it.
		return embed;
	}
}