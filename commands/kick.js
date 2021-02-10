const tools = require('../tools');

module.exports = {
	name: 'kick',
	category: 'Moderation',
	aliases: ['k'],
	description: "Kicks a user from the server.",
	usage: '<user> [reason]',
	requires: 'KICK_MEMBERS',
	minArgs: 1,
	guildOnly: true,
	async run(message, [user, ...reason]) {
		// Find the target user from mentions, or find by nick/username.
		const target = message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.user.id === user
		|| m.user.tag.startsWith(user)
		|| m.displayName.startsWith(user));
		
		// If no user was found, exit.
		if (!target) throw new Error('Invalid user or no user mentioned');

		// If the user's top role isn't higher than the target's, exit.
		if (message.member.roles.highest.position <= target.roles.highest.position)
			throw new Error('You cannot kick this user.')

		// Kick the user and send a confirmation or error message.
		target.kick(`${message.author.tag}: ${reason.join(' ')}`)
		.then(() => {
			message.channel.send(tools.embed('Success')
			.setDescription(`Kicked ${target}`));
		})
		.catch(e => {
			tools.error(message, e);
		});
	}
}