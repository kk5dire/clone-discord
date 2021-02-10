module.exports = {
	name: 'avatar',
	category: 'Image',
	aliases: ['av', 'pfp'],
	description: "Gets your or another user's avatar.",
	usage: '[user]',
	async run(message, args) {
		const target = (args.length ? message.mentions.members.first()
		|| message.guild.members.cache.find(m => m.user.id === args[0]
		|| m.user.tag.startsWith(args.join(' '))
		|| m.displayName.startsWith(args.join(' ')))
		|| message.member : message.member);

		return target.user.avatarURL({format: 'png', dynamic: true});
	}
}