const {MessageEmbed} = require('discord.js');
const config = require('./config.json');

module.exports = {
	urlregex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/i,

	embed(title) {
		return new MessageEmbed()
		.setTitle(title)
		.setColor(0x2F3136);
	},

	error(message, error) {
		const embed = this.embed('Error')
		.setDescription(error);
		message.channel.send(embed);
		return false;
	},

	timer(timestamp) {
		const timeLeft = timestamp - Date.now();
		const days = Math.floor(timeLeft / 86400000);
		const hours = Math.floor(timeLeft / 3600000) - (days * 24);
		const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
		const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
		string = '';
		if (days) string += `${days}d `;
		if (hours) string += `${hours}h `;
		if (minutes) string += `${minutes}min `;
		if (seconds) string += `${seconds}sec`;
		if (!string.length) string = `${timeLeft}ms`;
		return string;
	},

	setStatus(client) {
		const guildCount = client.guilds.cache.size;
		client.user.setActivity(`for ${config.prefix}help in ${guildCount} guilds`, {type: 'WATCHING'});
	},

	async fetchImage(message) {
		// attached to this message
		if (message.attachments.size) {
			return message.attachments.first().url;
		} else {
			
			// attached to a previous message
			const messages = await message.channel.messages.fetch({limit: 20});
			const attmsg = messages.find(m => m.attachments.size); 
			if (attmsg) {
				return attmsg.attachments.first().url;
			} else {

				// link in this or previous message
				const linkmsg = messages.find(m => this.urlregex.test(m.content));
				if (linkmsg) {
					return linkmsg.content.match(this.urlregex)[0];
				} else {
					throw new Error('No image found');
				}
			}
		}
	},

	removePings(string) {
		return string.replace(/<@&\d+>|@everyone|@here/g, `(mention removed)`);
	}
}