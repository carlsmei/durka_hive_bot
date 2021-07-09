const mongoose = require('@db');
const bot = require('@bot');

bot.use((ctx, next) => {
	if (mongoose.connection.readyState != 1) {
		ctx.reply('Ой, похоже нет соединения с БД, функционал недоступен >_<');

		return;
	};

	next();
});
