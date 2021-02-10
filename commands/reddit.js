const snoowrap = require('snoowrap');
const tools = require('../tools');
const auth = require('../reddit-auth.json');
const reddit = new snoowrap(auth);

module.exports = {
	name: 'reddit',
	category: 'Fun',
	aliases: ['r'],
	description: "Gets a random post from a subreddit.",
	usage: '<subreddit>',
	minArgs: 1,
	cooldown: 4000,
	async run(message, [subreddit]) {
		// Get the hot posts from the subreddit.
		const posts = await reddit.getSubreddit(subreddit).getHot()

		// Ignore meta-posts.
		.filter(post => !post.stickied);
		
		// Choose a random post.
		const post = posts[Math.floor(Math.random() * posts.length)];
		if (!post) throw new Error('Invalid subreddit');

		// Send an embed with the post's data.
		return tools.embed(post.title)
		.setAuthor(`u/${post.author.name}`)
		.setURL(`https://reddit.com${post.permalink}`)
		.setImage(post.url);
	}
}