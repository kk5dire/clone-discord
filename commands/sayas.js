const tools = require('../tools');

module.exports = {
	name: 'sayas',
	category: 'Utility',
	aliases: ['sa'],
	description: "Says a message as another user.",
	usage: '<user> <message ...>',
	minArgs: 2,
	guildOnly: true,
	async run(message, [user, ...content]) {
		// Find the target user from mentions, or find by nick/username.
		let target = message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.user.id === user
		|| m.user.tag.startsWith(user)
		|| m.displayName.startsWith(user));

		// If no user was found, exit.
		if (!target) throw new Error('Invalid user or no user mentioned');
		
		// Create a webhook for sending the message.
		avatar = target.user.avatarURL({format: 'png', dynamic: true});
		message.channel.createWebhook(target.displayName, {avatar: avatar}).then((hook) => {
			// Send the message through the webhook.
			hook.send(tools.removePings(content.join(' '))).then(() => {
				// Delete the command message and the webhook.
				message.delete();
				hook.delete();
			});
		});
	}
}