const tools = require('../tools');

module.exports = {
	name: 'lock',
	category: 'Moderation',
	aliases: ['lk', 'unlock', 'ul'],
	description: "Locks others from sending to this channel.",
	usage: '[-v] [#channel]',
	requires: 'MANAGE_CHANNELS',
	guildOnly: true,
	async run(message, args) {
		// If a channel was mentioned, use that, otherwise use the current channel.
		const channel = message.mentions.channels.first() || message.channel;
		const everyone = message.guild.roles.everyone.id;

		// If -v was given, hide the channel instead of locking.
		const prop = args.includes('-v') ? 'VIEW_CHANNEL' : 'SEND_MESSAGES';

		// Get the channel's permissions.
		const perm = channel.permissionOverwrites.has(everyone)
		&& channel.permissionOverwrites.get(everyone).deny.has(prop);

		// Toggle the permission.
		channel.updateOverwrite(everyone, {[prop]: perm})
		.then(() => {
			message.channel.send(tools.embed('Success')
			.setDescription(`${perm ? 'Unlocked' : 'Locked'} ${channel}`));
		})
		.catch(e => {
			tools.error(message, e);
		});
	}
}