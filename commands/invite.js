const tools = require('../tools');

module.exports = {
	name: 'invite',
	category: 'Information',
	aliases: ['support', 'inv'],
	description: "Sends the bot and server invite link.",
	async run(message, args) {
		return tools.embed('Links')
		.setDescription(
			`[Add me to your server](https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot)\n`+
			`[Join the meme cave™](https://discord.gg/vRzh7wr)\n`+
			`[View source code](https://github.com/gtrxAC/gtrxBot)`
		)
	}
}