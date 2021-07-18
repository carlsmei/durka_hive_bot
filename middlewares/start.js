const bot = require('@bot');
const config = require('config');

bot.start((ctx, next) => {
	if (!ctx.user.start_touched) {
		let text = ''
		let bot = config.get('backup_bot')

		if (bot) {
			text = '\n🌍 Резервные бот(ы):\n';
			bot = typeof(bot) == 'object' ? bot : {bot};

			const last_key = Object.keys(bot).pop();

			for (const [key, value] of Object.entries(bot)) {
				text = text + `${last_key == key ? '└ ' : '├ '}@${value}${last_key == key ? '' : '\n'}`;
			}
		}

		ctx.replyWithHTML(t('command.start', {bot_info: text}), {disable_web_page_preview: true});
		
		ctx.user.start_touched = true;
		ctx.user.save();

		next();
	}
	else {
		next();
	}
});
