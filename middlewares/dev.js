const config = require('config');
const bot = require('@bot');

bot.use((ctx, next) => {
	if (config.get('dev')) {
		let owner = config.get('owner');

		if (typeof(owner) == 'number') {
			if (ctx.from.id != owner) {
				ctx.reply('А вот хуй тебе, бот в разработке!');

				return;
			};
		};
	};

	next();
});
