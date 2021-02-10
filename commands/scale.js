const Canvas = require('canvas');
const tools = require('../tools');
const {MessageAttachment} = require('discord.js');

module.exports = {
	name: 'scale',
	category: 'Image',
	aliases: ['sc', 'resize'],
	description: "Resizes an image.",
	usage: '<width> <height> [noSmoothing] [image url]',
	minArgs: 2,
	async run(message, [width, height, noSmoothing]) {
		// Convert the arguments to numbers - canvas API doesn't convert automatically
		width = Number(width); height = Number(height);
		if (width > 4000 || height > 4000) throw new Error('too large, max 4000 px');

		// Get the image link.
		const link = await tools.fetchImage(message);

		// Create a new image.
		const canvas = Canvas.createCanvas(width, height);
		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = !noSmoothing;

		// Paste the new image on it.
		const image = await Canvas.loadImage(link);
		ctx.drawImage(image, 0, 0, width, height);

		// Send the image.
		const attachment = new MessageAttachment(canvas.toBuffer(), 'scaled.png');
		return {files: [attachment]};
	}
}