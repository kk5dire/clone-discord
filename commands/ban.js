const tools = require('../tools');

module.exports = {
	name: 'ban',
	category: 'Moderation',
	aliases: ['b'],
	description: "Bans a user from the server.",
	usage: '<user> [reason] [deletedays]',
	requires: 'BAN_MEMBERS',
	minArgs: 1,
	guildOnly: true,
	async run(message, [user, ...reason]) {
		// If the last arg is a number, use it as the number of days to delete messages.
		const lastArgNumber = parseInt(reason[reason.length - 1]);
		const days = (isFinite(lastArgNumber) ? parseInt(reason.pop()) : 0);
		
		// Find the target user from mentions, or find by nick/username.
		const target = message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.user.id === user
		|| m.user.tag.startsWith(user)
		|| m.displayName.startsWith(user));
		
		// If no user was found, exit.
		if (!target) throw new Error('Invalid user or no user mentioned');

		// If the user's top role isn't higher than the target's, exit.
		if (message.member.roles.highest.position <= target.roles.highest.position)
			throw new Error('You cannot ban this user.')

		// Ban the user and send a confirmation or error message.
		target.ban({
			reason: `${message.author.tag}: ${reason.join(' ')}`,
			days: days || 0
		})
		.then(() => {
			message.channel.send(tools.embed('Success')
			.setDescription(`Banned ${target}`));
		})
		.catch(e => {
			tools.error(message, e);
		});
	}
}